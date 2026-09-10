import { useEffect, useRef, useState } from "react";
import { Rotulo } from "../components/Rotulo.jsx";
import { digitar, revelar, revelarEmCascata } from "../motion/index.js";
import { VERBOS } from "../conteudo/comum.js";

/**
 * Os três blocos de propostas, em recibo catalogado (LG-15).
 *
 * Cada página interna traz de 18 a 30 propostas em lista corrida. O original
 * empilha as três listas sem nenhum meio de escanear, e a engenharia reversa
 * §5.1 sugere colapsá-las em acordeão. Aqui NÃO se colapsa: a regra do
 * catálogo é que conteúdo nunca fica preso invisível, e proposta escondida em
 * site de campanha é proposta não lida.
 *
 * O que resolve a mesma dor sem esconder nada é a barra de âncoras grudada:
 * os três verbos ficam no alto com a contagem de propostas de cada um, o verbo
 * do bloco em leitura acende, e clicar salta. Em página de trinta bullets isso
 * é navegação, não enfeite.
 *
 * O verbo é constante e o complemento é adaptado ao público — é o sistema de
 * conteúdo que a engenharia reversa chama de "o princípio mais valioso do site
 * inteiro". A cor de cada verbo é a mesma nas quatro páginas.
 *
 * Cada item é numerado em colchetes, com medida de linha travada em 65
 * caracteres e corpo de 17–18px: a mudança tipográfica de maior efeito que o
 * §2.2 aponta, porque este site é, essencialmente, uma coleção de listas.
 */
export function Propostas({ blocos, quem }) {
  const raiz = useRef(null);
  const [atual, definirAtual] = useState(0);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    revelar(no.querySelector(".propostas__cabeca .rotulo"));
    digitar(no.querySelector(".propostas__titulo"), { atraso: 60, naRolagem: true });
    revelarEmCascata(no.querySelectorAll(".proposta"), { intervalo: 30 });

    const grupos = [...no.querySelectorAll(".grupo")];
    if (!grupos.length || !("IntersectionObserver" in window)) return;
    const visiveis = new Set();
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const indice = Number(e.target.dataset.grupo);
          if (e.isIntersecting) visiveis.add(indice);
          else visiveis.delete(indice);
        }
        if (visiveis.size) definirAtual(Math.min(...visiveis));
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    for (const grupo of grupos) obs.observe(grupo);
    return () => obs.disconnect();
  }, []);

  const total = blocos.reduce((soma, bloco) => soma + bloco.itens.length, 0);

  return (
    <section id="propostas" className="bloco propostas" data-theme="cartaz" ref={raiz}>
      <div className="envelope">
        <header className="propostas__cabeca">
          <Rotulo>as propostas</Rotulo>
          <h2 className="propostas__titulo titulo h1" data-revelar>
            {total} propostas para {quem.toLowerCase()}
          </h2>
        </header>
      </div>

      <nav className="atalhos" aria-label="Blocos de propostas">
        <ol className="envelope atalhos__lista">
          {blocos.map(({ chave, verbo, itens }, indice) => (
            <li
              className={`atalho${indice === atual ? " atalho--aceso" : ""}`}
              key={chave}
              data-acento={VERBOS[indice].cor}
            >
              <a className="atalho__link" href={`#${chave}`}>
                <span className="atalho__ponto" aria-hidden="true" />
                <span className="atalho__verbo label">{verbo}</span>
                <span className="atalho__conta mono-reg" data-num>
                  {String(itens.length).padStart(2, "0")}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="envelope propostas__trilho">
        {blocos.map(({ chave, verbo, complemento, itens }, indice) => (
          <article
            className="grupo"
            id={chave}
            key={chave}
            data-grupo={indice}
            data-acento={VERBOS[indice].cor}
          >
            <header className="grupo__cabeca">
              <span className="grupo__n mono-reg" data-num>
                [{String(indice + 1).padStart(2, "0")} de 03 · {itens.length} propostas]
              </span>
              <h3 className="grupo__titulo display">
                <span className="grupo__verbo">{verbo}</span>{" "}
                <span className="grupo__complemento">{complemento}</span>
              </h3>
            </header>

            <ol className="grupo__itens">
              {itens.map((item, i) => (
                <li className="proposta" key={item} data-revelar>
                  <span className="proposta__n mono-reg" data-num>
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <p className="proposta__texto body prosa">{item}</p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
