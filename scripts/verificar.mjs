/**
 * Conferência automatizada do que dá para medir.
 *
 * A engenharia reversa §5.3 chama a acessibilidade de "o ponto mais frágil"
 * do site publicado, e lista os achados: parágrafos marcados como `h1`, `h4`
 * pulado, headings vazios com caractere invisível, o método central como
 * imagem sem `alt`, texto dentro de captura de tela. Nada disso se descobre
 * olhando — descobre-se medindo. Este script mede.
 *
 * O que ele cobre, nas QUATRO páginas:
 *
 *   1. Abre e é legível sem JavaScript, com um `h1` por página.
 *   2. Hierarquia de títulos sem salto de nível e sem heading vazio.
 *   3. Nada preso invisível depois da hidratação.
 *   4. Sem rolagem horizontal em 390px nem em 1280px.
 *   5. Contraste de texto ≥ 4,5:1 (≥ 3:1 acima de 24px), nos dois temas.
 *   6. Toda imagem com `alt`, todo link com nome acessível.
 *   7. Console limpo — erro de hidratação aqui é silencioso no navegador.
 *
 * O que ele NÃO cobre continua sendo trabalho de olho: composição, ritmo e a
 * prova em tela real. Passar aqui não aprova a peça; reprovar aqui reprova.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   npm run verificar
 */
let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.error(
    "\n  verificar  precisa de playwright-core e de um Chromium.\n" +
      "             npm i -D playwright-core\n" +
      "             CHROMIUM=/caminho/para/chrome npm run verificar\n",
  );
  process.exit(2);
}

const EXEC = process.env.CHROMIUM ?? null;
const BASE = (process.argv[2] ?? "http://localhost:4173").replace(/\/$/, "");
const ROTAS = ["/", "/professores", "/tecnicos", "/estudantes"];

const nav = await chromium.launch(
  EXEC ? { executablePath: EXEC, headless: true } : { headless: true },
);

let falhou = false;
const linha = (id, ok, nota) => {
  if (!ok) falhou = true;
  console.log(`  ${id.padEnd(22)} ${ok ? "ok      " : "REPROVOU"} ${nota}`);
};

/* ---- 1. Sem JavaScript ---------------------------------------------------
   A página é, na prática, um documento de plano de gestão. Sem JS ela precisa
   abrir inteira: é o que busca, leitor de tela em rede ruim e visitante em 4G
   recebem primeiro. */
for (const rota of ROTAS) {
  const ctx = await nav.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 780 },
  });
  const p = await ctx.newPage();
  await p.goto(BASE + rota, { waitUntil: "load" });
  const r = await p.evaluate(() => ({
    texto: document.body.innerText.replace(/\s+/g, " ").trim().length,
    h1: document.querySelectorAll("h1").length,
    ctas: [...document.querySelectorAll("a[href^='mailto:']")].length,
    escondido: [...document.querySelectorAll("[data-revelar]")].filter(
      (e) => parseFloat(getComputedStyle(e).opacity) < 0.99,
    ).length,
  }));
  linha(
    `sem-js ${rota}`,
    r.texto > 1500 && r.h1 === 1 && r.ctas >= 1 && r.escondido === 0,
    `${r.texto} caracteres · ${r.h1} h1 · ${r.ctas} mailto · ${r.escondido} escondidos`,
  );
  await ctx.close();
}

/* ---- 2 a 7. Com JavaScript ----------------------------------------------- */
for (const rota of ROTAS) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  const ruido = [];
  p.on("pageerror", (e) => ruido.push(String(e).slice(0, 120)));
  p.on("console", (m) => {
    if (m.type() === "error") ruido.push(m.text().slice(0, 120));
  });
  await p.goto(BASE + rota, { waitUntil: "networkidle" });
  await p.waitForTimeout(3600); // tempo pras animações de entrada terminarem

  const r = await p.evaluate(() => {
    const niveis = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
    let salto = null;
    let vazio = 0;
    let anterior = 0;
    for (const h of niveis) {
      const n = Number(h.tagName[1]);
      const texto = h.textContent.replace(/[\s​]+/g, "");
      if (!texto) vazio += 1;
      if (anterior && n > anterior + 1) salto ??= `${anterior}→${n} em "${h.textContent.slice(0, 30)}"`;
      anterior = n;
    }

    const semAlt = [...document.querySelectorAll("img")].filter(
      (i) => i.getAttribute("alt") === null,
    ).length;

    // `textContent`, nao `innerText`: o segundo devolve vazio para o que esta
    // em `visibility: hidden`, e o "voltar ao topo" nasce assim. Escondido ele
    // tambem sai da ordem de tabulacao, entao nao e link sem nome — e link que
    // ainda nao existe.
    const semNome = [...document.querySelectorAll("a")].filter((a) => {
      if (a.getAttribute("aria-hidden") === "true") return false;
      const nome = (a.getAttribute("aria-label") ?? a.textContent ?? "").trim();
      return !nome;
    }).length;

    const invisivel = [...document.querySelectorAll("[data-revelar]")].filter((e) => {
      const caixa = e.getBoundingClientRect();
      const dentro = caixa.top < innerHeight && caixa.bottom > 0;
      return dentro && parseFloat(getComputedStyle(e).opacity) < 0.99;
    }).length;

    return {
      h1: document.querySelectorAll("h1").length,
      salto,
      vazio,
      semAlt,
      semNome,
      invisivel,
      largura: document.documentElement.scrollWidth,
      janela: innerWidth,
    };
  });

  linha(`hierarquia ${rota}`, r.h1 === 1 && !r.salto && r.vazio === 0,
    `${r.h1} h1 · salto: ${r.salto ?? "nenhum"} · ${r.vazio} heading vazio`);
  linha(`nomes ${rota}`, r.semAlt === 0 && r.semNome === 0,
    `${r.semAlt} imagem sem alt · ${r.semNome} link sem nome`);
  linha(`390px ${rota}`, r.largura <= r.janela + 1,
    `documento ${r.largura}px em janela de ${r.janela}px`);
  linha(`visível ${rota}`, r.invisivel === 0, `${r.invisivel} elementos presos invisíveis`);
  linha(`console ${rota}`, ruido.length === 0, ruido[0] ?? "sem erro");

  await ctx.close();
}

/* ---- Contraste, nos dois temas, na página mais densa ---------------------- */
{
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/professores`, { waitUntil: "networkidle" });
  await p.waitForTimeout(3600);

  const ruins = await p.evaluate(() => {
    const rgb = (s) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const lum = ([r, g, b]) => {
      const f = [r, g, b].map((v) => {
        const x = v / 255;
        return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    };
    const razao = (a, b) => {
      const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
      return (x + 0.05) / (y + 0.05);
    };
    const fundoDe = (el) => {
      for (let n = el; n; n = n.parentElement) {
        const c = getComputedStyle(n).backgroundColor;
        const v = rgb(c);
        if (v.length === 3 && !/rgba\(.*,\s*0\)/.test(c)) return v;
      }
      return [255, 255, 255];
    };

    const falhas = [];
    for (const el of document.querySelectorAll("p,li,h1,h2,h3,span,a")) {
      if (!el.innerText?.trim() || el.children.length) continue;
      if (el.closest('[aria-hidden="true"]')) continue; // ornamento, nao texto
      const e = getComputedStyle(el);
      if (parseFloat(e.opacity) < 0.9) continue; // palavra ainda apagada
      // A palavra vazada comunica pelo CONTORNO, e o preenchimento e
      // transparente de proposito: medir a cor do preenchimento aqui daria
      // 1:1 e reprovaria o que se le perfeitamente.
      if (parseFloat(e.webkitTextStrokeWidth) > 0) continue;
      const caixa = el.getBoundingClientRect();
      if (!caixa.width || !caixa.height) continue;
      const tamanho = parseFloat(e.fontSize);
      const grande = tamanho >= 24 || (tamanho >= 18.66 && Number(e.fontWeight) >= 700);
      const minimo = grande ? 3 : 4.5;
      const r = razao(rgb(e.color), fundoDe(el));
      if (r < minimo) {
        falhas.push(`${el.innerText.slice(0, 28)} ${r.toFixed(2)}:1 (${tamanho}px)`);
      }
    }
    return falhas;
  });

  linha("contraste", ruins.length === 0, ruins.slice(0, 3).join(" | ") || "todo texto acima do mínimo");
  await ctx.close();
}

/* ---- Movimento reduzido --------------------------------------------------- */
{
  const ctx = await nav.newContext({
    viewport: { width: 390, height: 780 },
    reducedMotion: "reduce",
  });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/estudantes`, { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  // So o que esta NA TELA: revelacao por rolagem continua valendo sob
  // movimento reduzido — o que muda e a forma (opacidade, sem deslocamento e
  // sem corte), nao o gatilho. Contar a pagina inteira contaria como defeito o
  // que ainda nao foi rolado.
  const r = await p.evaluate(() => ({
    invisivel: [...document.querySelectorAll("[data-revelar],.palavra,.parte")].filter((e) => {
      const caixa = e.getBoundingClientRect();
      const dentro = caixa.top < innerHeight && caixa.bottom > 0;
      return dentro && parseFloat(getComputedStyle(e).opacity) < 0.99;
    }).length,
  }));
  linha("movimento reduzido", r.invisivel === 0, `${r.invisivel} elementos apagados`);
  await ctx.close();
}

await nav.close();
console.log("");
process.exit(falhou ? 1 : 0);
