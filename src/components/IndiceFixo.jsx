import { useEffect, useState } from "react";

/**
 * Paginação fixa "03 / 09", no canto (LG-19).
 *
 * Diz onde o visitante está numa página longa, e é micro registro técnico.
 * `mix-blend-mode: difference` resolve a legibilidade sobre os dois temas sem
 * duplicar o elemento por bloco.
 *
 * NÃO usa `IntersectionObserver`: em página com seções grudadas toda seção já
 * alcançada continua intersectando e o contador trava no último número — e o
 * defeito é silencioso porque o número continua plausível. A pergunta certa é
 * QUEM ESTÁ POR CIMA, que é a última seção a alcançar o meio da tela, e isso
 * se lê direto da geometria.
 *
 * Um quadro por rolagem, nunca uma medida por evento.
 */
export function IndiceFixo({ ids }) {
  const [atual, definirAtual] = useState(1);

  useEffect(() => {
    const secoes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!secoes.length) return;

    let agendado = 0;
    const medir = () => {
      agendado = 0;
      const meio = window.innerHeight / 2;
      let topo = 0;
      for (const [indice, secao] of secoes.entries()) {
        if (secao.getBoundingClientRect().top <= meio) topo = indice;
      }
      definirAtual(topo + 1);
    };
    const aoRolar = () => {
      if (!agendado) agendado = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(agendado);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [ids]);

  const doisDigitos = (n) => String(n).padStart(2, "0");

  return (
    <div className="indice-fixo mono-reg" aria-hidden="true" data-num>
      {doisDigitos(atual)} / {doisDigitos(ids.length)}
    </div>
  );
}

/**
 * Voltar ao topo. A engenharia reversa §5.1 chama de obrigatório em páginas
 * longas, e as três páginas internas têm de 18 a 30 propostas mais 30 itens de
 * método. Aparece depois de duas telas, entra e sai por corte.
 *
 * É `<a href="#topo">`, não um botão com `scrollTo`: sem JavaScript o salto
 * continua funcionando, e com JavaScript o Lenis suaviza a âncora sozinho.
 */
export function AoTopo() {
  const [visivel, definirVisivel] = useState(false);

  useEffect(() => {
    let agendado = 0;
    const medir = () => {
      agendado = 0;
      definirVisivel(window.scrollY > window.innerHeight * 2);
    };
    const aoRolar = () => {
      if (!agendado) agendado = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(agendado);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  return (
    <a className={`ao-topo overline${visivel ? " ao-topo--visivel" : ""}`} href="#topo">
      <span aria-hidden="true">&#8593;</span> topo
    </a>
  );
}
