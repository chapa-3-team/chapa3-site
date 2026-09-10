// Diagnóstico v3: `reducedMotion:'reduce'` faz `digitar()` pular o
// `splitText` (early-return em motion/index.js), então o texto fica intacto
// — sem span por letra — e a medição reflete só CSS/layout, não animação em
// trânsito. Espera fontes carregarem. Checa toda linha (`.linha__texto`) e
// órfã em qualquer posição, não só a última.
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:5174";
const ROTAS = ["/", "/professores", "/tecnicos", "/estudantes"];
const LARGURAS = [320, 340, 360, 375, 390, 414, 428, 480, 540, 600, 680, 768, 850, 900, 1000, 1024, 1120, 1200, 1280, 1360, 1440];

const browser = await chromium.launch({ headless: true });
const achados = [];

for (const rota of ROTAS) {
  for (const largura of LARGURAS) {
    const ctx = await browser.newContext({ viewport: { width: largura, height: 1000 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(BASE + rota, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);

    const resultado = await page.evaluate(() => {
      function linhasDoElemento(el) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const linhas = new Map();
        let no;
        while ((no = walker.nextNode())) {
          const re = /\S+/g;
          let m;
          while ((m = re.exec(no.textContent))) {
            const range = document.createRange();
            range.setStart(no, m.index);
            range.setEnd(no, m.index + m[0].length);
            const rects = range.getClientRects();
            if (!rects.length) continue;
            const top = Math.round(rects[0].top);
            if (!linhas.has(top)) linhas.set(top, []);
            linhas.get(top).push(m[0]);
          }
        }
        return [...linhas.entries()].sort((a, b) => a[0] - b[0]).map(([, p]) => p);
      }

      const achados = [];

      // Regra real: uma linha só é problema se tiver 1 palavra E essa
      // palavra não for longa (>5 letras) — não "quebrou em 2 linhas", que
      // por si só não é defeito nenhum se as duas ainda tiverem >=2 palavras
      // ou a exceção da palavra longa.
      for (const el of document.querySelectorAll(".linha__texto")) {
        const grupos = linhasDoElemento(el);
        for (const g of grupos) {
          if (g.length === 1) {
            const p = g[0].replace(/[^\p{L}\p{N}]/gu, "");
            if (p.length > 0 && p.length <= 5) {
              achados.push({
                tipo: "linha-orfa",
                seletor: el.closest('[class*="titulo"]')?.className ?? el.className,
                resultado: grupos.map((x) => x.join(" ")).join(" / "),
                palavra: g[0],
              });
              break;
            }
          }
        }
      }

      const seletor =
        "h1, h2, h3, .display, .display-xl, .display-xxl, .capa__titulo, .capa__chapa, " +
        ".metodo__titulo, .pilares__titulo, .identidade__titulo, .painel__titulo, .rodape__grande, .rodape__sintese";
      for (const el of document.querySelectorAll(seletor)) {
        if (el.closest('[aria-hidden="true"]')) continue;
        if (getComputedStyle(el).display === "none") continue;
        if (el.scrollWidth > el.clientWidth + 1) {
          achados.push({ tipo: "overflow", seletor: el.className || el.tagName, texto: el.textContent.trim().slice(0, 60), excesso: el.scrollWidth - el.clientWidth });
        }
        for (const g of linhasDoElemento(el)) {
          if (g.length === 1) {
            const p = g[0].replace(/[^\p{L}\p{N}]/gu, "");
            if (p.length > 0 && p.length <= 5) {
              achados.push({ tipo: "orfa", seletor: el.className || el.tagName, texto: el.textContent.trim().slice(0, 60), palavra: g[0] });
            }
          }
        }
      }
      return achados;
    });

    for (const r of resultado) achados.push({ rota, largura, ...r });
    await ctx.close();
  }
}

await browser.close();

const vistos = new Set();
for (const a of achados) {
  const chave = `${a.rota}|${a.tipo}|${a.seletor}|${a.resultado ?? a.palavra ?? ""}`;
  if (vistos.has(chave)) continue; // já visto nessa rota+seletor, não repete por largura
  vistos.add(chave);
  console.log(
    `${a.rota.padEnd(14)} ${String(a.largura).padStart(5)}px  ${a.tipo.padEnd(15)} ${String(a.seletor).slice(0, 45).padEnd(45)} ${a.texto ? `"${a.texto}"` : ""}${a.palavra ? ` -> "${a.palavra}"` : ""}${a.resultado ? `[${a.resultado}]` : ""}${a.excesso ? ` (+${a.excesso}px)` : ""}`,
  );
}
console.log(`\nTotal (dedup por rota+tipo+seletor): ${vistos.size} | achados brutos: ${achados.length}`);
