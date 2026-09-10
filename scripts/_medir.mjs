// Mede a largura real (em "em", ou seja, largura/font-size) de cada
// fragmento de linha composta à mão, no MESMO contexto de fonte/peso/caixa
// que ele usa na página — pra achar o divisor de calc() que garante que a
// linha mais larga de verdade caiba, e não um valor chutado.
import { chromium } from "playwright-core";

const GRUPOS = {
  "display-xxl (Painel linhas, Capa, Identidade)": {
    css: `font-family: var(--font-secundaria); font-weight: var(--peso-black); text-transform: uppercase; letter-spacing: 0.01em;`,
    frases: [
      "União e Gestão com", "Responsabilidade",
      "Quem faz a FURB", "precisa ser ouvido",
      "Quem ensina conhece", "a realidade de quem aprende",
      "Técnicos fazem", "a FURB acontecer",
      "Diferentes setores", "Vários conhecimentos", "Uma FURB",
      "Escutar não é uma etapa", "só de comunicação.",
      "50 cursos diferentes", "muitas trajetórias",
      "Construindo", "o futuro",
      "8 PARTES", "1 PROPÓSITO",
    ],
  },
  "pilares__titulo": {
    css: `font-family: var(--font-secundaria); font-weight: var(--peso-black); letter-spacing: -0.01em;`,
    frases: ["O que significa", "União e Gestão com", "Responsabilidade?"],
  },
  "metodo__titulo": {
    css: `font-family: var(--font-secundaria); font-weight: var(--peso-black); text-transform: uppercase; letter-spacing: 0.01em;`,
    frases: ["COMO VAMOS", "TRABALHAR"],
  },
};

const b = await chromium.launch({ headless: true });
const p = await (await b.newContext()).newPage();
await p.goto("http://localhost:5174/", { waitUntil: "load" });
await p.evaluate(() => document.fonts.ready);

for (const [nome, { css, frases }] of Object.entries(GRUPOS)) {
  console.log(`\n== ${nome} ==`);
  const resultados = await p.evaluate(
    ([css, frases]) => {
      const el = document.createElement("div");
      el.style.cssText = `position:absolute; visibility:hidden; white-space:nowrap; font-size:200px; ${css}`;
      document.body.appendChild(el);
      const out = frases.map((f) => {
        el.textContent = f;
        return { frase: f, em: el.scrollWidth / 200 };
      });
      el.remove();
      return out;
    },
    [css, frases],
  );
  resultados.sort((a, b) => b.em - a.em);
  for (const r of resultados) console.log(`  ${r.em.toFixed(3)}em  "${r.frase}"`);
  console.log(`  -> pior caso: ${resultados[0].em.toFixed(3)}em ("${resultados[0].frase}")`);
}

await b.close();
