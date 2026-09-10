import { useEffect, useRef, useState } from "react";
import { Rotulo } from "../components/Rotulo.jsx";
import { digitar, revelarEmCascata } from "../motion/index.js";
import { ETAPAS, METODO_CABECA } from "../conteudo/comum.js";

/**
 * O método em cinco etapas: PRESENÇA → ESCUTA → DIAGNÓSTICO → DECISÃO →
 * RESULTADO.
 *
 * Esta é a peça mais importante do site inteiro e a mais mal servida no
 * original. Lá ela é UMA IMAGEM — `Captura de tela 2026-08-29 162705.png`,
 * 980×351, a mesma nas três páginas — com trinta bullets de texto rasterizado
 * dentro. A engenharia reversa é direta sobre o custo: "o método central da
 * campanha é invisível para quem não enxerga", e em 390px de largura a imagem
 * é simplesmente ilegível.
 *
 * Aqui ela é uma régua (LG-12) mais um trilho de blocos: os cinco rótulos
 * ficam grudados no alto, a etapa em leitura acende, e cada etapa traz os
 * seus bullets como texto de verdade — selecionável, indexável, traduzível,
 * lido em voz alta. Os rótulos são âncoras: clicar salta para a etapa, que em
 * página desta altura é navegação, não enfeite.
 *
 * A régua NÃO usa progresso linear de rolagem, e a razão é que as cinco
 * etapas têm alturas diferentes: sete bullets ocupam mais tela que cinco, e um
 * avanço linear acenderia a etapa errada no meio do bloco. Quem responde
 * "qual etapa estou lendo" é a faixa central da janela.
 *
 * Cor nunca comunica sozinha: a etapa acesa muda de preenchimento (vazado
 * para cheio) e o rótulo muda de peso junto.
 */
export function Metodo({ etapas }) {
  const raiz = useRef(null);
  const [atual, definirAtual] = useState(0);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;

    digitar(no.querySelectorAll(".metodo__titulo .linha__texto"), {
      naRolagem: true,
      pai: no.querySelector(".metodo__titulo"),
    });
    revelarEmCascata(no.querySelectorAll(".principio"), { intervalo: 80 });
    revelarEmCascata(no.querySelectorAll(".etapa__item"), { intervalo: 40 });

    const blocos = [...no.querySelectorAll(".etapa")];
    if (!blocos.length || !("IntersectionObserver" in window)) return;

    // A faixa central da janela e quem decide: `-45%` em cima e embaixo deixa
    // uma fatia de 10% no meio da tela, e a etapa que a cruza e a que se esta
    // lendo. Sem isso, com dois blocos visiveis ao mesmo tempo, a regua
    // oscilaria entre eles a cada quadro.
    const visiveis = new Set();
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const indice = Number(e.target.dataset.etapa);
          if (e.isIntersecting) visiveis.add(indice);
          else visiveis.delete(indice);
        }
        if (visiveis.size) definirAtual(Math.min(...visiveis));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const bloco of blocos) obs.observe(bloco);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="metodo" className="bloco metodo" ref={raiz}>
      <div className="envelope">
        <header className="metodo__cabeca">
          <Rotulo>como vamos trabalhar</Rotulo>
          <h2 className="metodo__titulo" data-revelar>
            {METODO_CABECA.titulo.map((linha, indice) => (
              <span className="linha" key={linha}>
                <span className={`linha__texto${indice ? " vazado" : ""}`}>{linha}</span>
              </span>
            ))}
          </h2>
          <p className="metodo__tese body-lg prosa">{METODO_CABECA.tese}</p>
        </header>
      </div>

      <nav className="regua" aria-label="Etapas do método">
        <ol className="envelope regua__lista">
          {ETAPAS.map((nome, indice) => (
            <li
              className={`regua__etapa${indice === atual ? " regua__etapa--acesa" : ""}`}
              key={nome}
            >
              <a className="regua__link" href={`#etapa-${indice + 1}`}>
                <span className="regua__ponto" aria-hidden="true" />
                <span className="regua__n mono-reg" data-num>
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <span className="regua__nome overline">{nome}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="envelope metodo__trilho">
        {ETAPAS.map((nome, indice) => (
          <article
            className="etapa"
            id={`etapa-${indice + 1}`}
            key={nome}
            data-etapa={indice}
            data-acento={indice === 4 ? "osso" : indice % 2 ? "ceu" : "ambar"}
          >
            <header className="etapa__cabeca">
              <span className="etapa__n display-xxl" aria-hidden="true" data-num>
                {indice + 1}
              </span>
              <h3 className="etapa__nome h1">{nome}</h3>
            </header>
            <ul className="etapa__itens">
              {etapas[indice].map((item) => (
                <li className="etapa__item body" key={item} data-revelar>
                  <span className="etapa__marca" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="envelope">
        <ul className="principios">
          {METODO_CABECA.principios.map((texto, indice) => (
            <li className="principio" key={texto} data-revelar>
              <span className="principio__n mono-reg" data-num>
                [{String(indice + 1).padStart(2, "0")}]
              </span>
              <p className="principio__texto h3">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
