import { useEffect, useRef } from "react";
import { Rotulo } from "../components/Rotulo.jsx";
import { Simbolo } from "../components/Simbolo.jsx";
import { digitar, revelar, revelarEmCascata } from "../motion/index.js";
import { PUBLICOS } from "../conteudo/home.js";

/**
 * Os três públicos, com a cabeça grudada e os cards em ziguezague (LG-10).
 *
 * A cabeça fica centrada e grudada no meio da tela e os cards passam por cima
 * dela ao rolar — em ziguezague de três colunas no monitor, empilhados no
 * celular. É a peça mais importante da home, porque é a porta das três
 * páginas internas, e é a decisão estrutural que a engenharia reversa aponta
 * como o maior acerto do site: navegação por QUEM VOTA, não por tipo de
 * conteúdo.
 *
 * Os três cards são links inteiros e agora PARECEM clicáveis (RE §5.2): o
 * card inteiro é a área de toque, tem elevação por fio no hover, o símbolo
 * gira um oitavo e o CTA muda de cor. No site publicado não há nenhuma
 * indicação visual de que sejam links.
 *
 * O número de propostas de cada página é dado, não enfeite: diz de antemão o
 * tamanho do que vem depois do clique.
 */
export function Publicos() {
  const raiz = useRef(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    revelar(no.querySelector(".rotulo"));
    digitar(no.querySelector(".publicos__titulo"), { atraso: 60, naRolagem: true });
    revelar(no.querySelector(".publicos__sub"), { atraso: 200 });
    revelarEmCascata(no.querySelectorAll(".publico"), { intervalo: 90 });
  }, []);

  return (
    <section id="publicos" className="bloco publicos" ref={raiz}>
      <div className="envelope publicos__palco">
        <header className="publicos__cabeca">
          <Rotulo>para quem</Rotulo>
          <h2 className="publicos__titulo titulo display" data-revelar>
            Três públicos. Um mesmo método.
          </h2>
          <p className="publicos__sub body prosa" data-revelar>
            As propostas mudam conforme quem faz a Universidade. A forma de
            chegar até elas, não.
          </p>
        </header>

        <ul className="publicos__lista">
          {PUBLICOS.map(({ rota, quem, titulo, resumo, cta, propostas }, indice) => (
            <li className="publico" key={rota} data-revelar>
              <a className="publico__link" href={rota}>
                <span className="publico__capa" aria-hidden="true">
                  <Simbolo className="publico__simbolo" />
                  <span className="publico__quem h1">{quem}</span>
                </span>
                <span className="publico__corpo">
                  <span className="publico__indice mono-reg" data-num>
                    [{String(indice + 1).padStart(2, "0")} · {propostas} propostas]
                  </span>
                  <span className="publico__titulo h2">{titulo}</span>
                  <span className="publico__resumo body">{resumo}</span>
                  <span className="publico__cta label">
                    {cta} <span aria-hidden="true">&#8594;</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
