import { useEffect, useRef } from "react";
import { TRIANGULOS_D } from "./Simbolo.jsx";
import { semMovimento } from "../motion/tokens.js";

/**
 * O fundo animado da campanha: o campo de pontos e as pontas soltas do
 * símbolo. Nasceu na capa e a seção "8 partes · 1 propósito" pediu o mesmo
 * fundo — ambos leem `--bone`/`--line`/`--ambar-area`/`--bone-pure` do
 * elemento local, não da raiz, então o mesmo par de componentes veste as
 * cores do Sigilo (azul) na capa e as do Cartaz (papel) na identidade sem
 * nenhuma prop de cor: é o tema da seção quem decide (`cor.css`).
 */

/* ---- O campo de pontos ------------------------------------------------------
   Rede regular (não aleatória) de pontos de 1,5px, deslocada por duas
   senoides cruzadas — crista aparece, vale some. Só anima na tela
   (`IntersectionObserver`) e, sob `prefers-reduced-motion`, desenha um único
   quadro parado. Densidade por área com teto de pontos, para não pesar em
   monitor grande. */
const ESPACO = 26; // distância entre pontos, em px de layout
const MAX_PONTOS = 2600; // teto de pontos por quadro
const GRADE = 160; // distância entre os fios da grade

export function CampoDePontos() {
  const tela = useRef(null);

  useEffect(() => {
    const canvas = tela.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduzido = semMovimento();
    // Lido do PRÓPRIO canvas, não de `document.documentElement`: a cascata
    // resolve `--bone`/`--line` para o tema da seção (Sigilo na capa, Cartaz
    // na identidade), e o componente não precisa saber qual é.
    const estilo = getComputedStyle(canvas);
    const corPonto = estilo.getPropertyValue("--bone").trim() || "#f2f7fc";
    const corFio = estilo.getPropertyValue("--line").trim() || "#1b4d8c";

    let largura = 0;
    let altura = 0;
    let colunas = 0;
    let linhas = 0;
    let quadro = 0;
    let vivo = false;

    const medir = () => {
      const caixa = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = Math.max(1, Math.round(caixa.width));
      altura = Math.max(1, Math.round(caixa.height));
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      let espaco = ESPACO;
      while ((largura / espaco) * (altura / espaco) > MAX_PONTOS) espaco += 2;
      colunas = Math.ceil(largura / espaco) + 1;
      linhas = Math.ceil(altura / espaco) + 1;
      canvas.dataset.espaco = String(espaco);
    };

    const pintar = (t) => {
      const espaco = Number(canvas.dataset.espaco) || ESPACO;
      ctx.clearRect(0, 0, largura, altura);

      // A grade: fios de 1px, o mesmo vocabulário do resto da página.
      ctx.strokeStyle = corFio;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      for (let x = GRADE / 2; x < largura; x += GRADE) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, altura);
      }
      for (let y = GRADE / 2; y < altura; y += GRADE) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(largura, Math.round(y) + 0.5);
      }
      ctx.stroke();

      // A superfície: duas senoides cruzadas deslocam o ponto no eixo Y, e a
      // mesma conta manda na opacidade. Ponto alto aparece, ponto baixo some.
      ctx.fillStyle = corPonto;
      for (let i = 0; i < colunas; i += 1) {
        const x = i * espaco;
        for (let j = 0; j < linhas; j += 1) {
          const y = j * espaco;
          const onda =
            Math.sin(x * 0.011 + t * 0.00042) * Math.cos(y * 0.013 - t * 0.00031) +
            Math.sin((x + y) * 0.006 + t * 0.00019);
          const alpha = 0.06 + Math.max(0, onda) * 0.34;
          if (alpha <= 0.07) continue;
          ctx.globalAlpha = alpha;
          ctx.fillRect(Math.round(x), Math.round(y + onda * 9), 1.5, 1.5);
        }
      }
      ctx.globalAlpha = 1;
    };

    const laco = (t) => {
      if (!vivo) return;
      pintar(t);
      quadro = requestAnimationFrame(laco);
    };

    medir();
    pintar(0);

    const aoRedimensionar = () => {
      medir();
      if (!vivo) pintar(performance.now());
    };
    window.addEventListener("resize", aoRedimensionar, { passive: true });

    // Sob movimento reduzido fica no quadro único.
    let observador = null;
    if (!reduzido && "IntersectionObserver" in window) {
      observador = new IntersectionObserver(
        ([entrada]) => {
          if (entrada.isIntersecting && !vivo) {
            vivo = true;
            quadro = requestAnimationFrame(laco);
          } else if (!entrada.isIntersecting && vivo) {
            vivo = false;
            cancelAnimationFrame(quadro);
          }
        },
        { rootMargin: "120px 0px" },
      );
      observador.observe(canvas);
    }

    return () => {
      vivo = false;
      cancelAnimationFrame(quadro);
      observador?.disconnect();
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, []);

  return <canvas className="campo-pontos" ref={tela} aria-hidden="true" />;
}

/* ---- As pontas soltas -------------------------------------------------------
   A mesma ponta de triângulo do símbolo (`TRIANGULOS_D[0]`), sem o resto da
   roda: dez cópias espalhadas pela seção inteira, cada uma com sua própria
   animação CSS. Dez elementos fixos — nunca mais que dez ao mesmo tempo —
   cada um com duração e atraso diferentes, para as fases nunca coincidirem;
   é esse desalinho que lê como aleatório, sem laço de JS. `pointer-events:
   none` porque a camada delas fica ACIMA do conteúdo (inclusive do botão). */
export function TriangulosSoltos() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <svg
          key={n}
          className={`particula particula--${n}`}
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <path d={TRIANGULOS_D[0]} />
        </svg>
      ))}
    </>
  );
}
