import { useEffect, useRef } from "react";
import { Rotulo } from "../components/Rotulo.jsx";
import { digitar, revelar, revelarEmCascata } from "../motion/index.js";
import { COMPROMISSOS } from "../conteudo/home.js";
import { VERBOS } from "../conteudo/comum.js";

/**
 * Os três compromissos, em baralho de cartas empilhadas (LG-09).
 *
 * Cada carta gruda num degrau abaixo da anterior e a seguinte sobe por cima:
 * no fim as três estão na tela, as cobertas reduzidas à faixa do número. A
 * lista ACUMULA em vez de rolar — que é literalmente o argumento da seção, já
 * que os três compromissos são cumulativos e reaparecem nas três páginas
 * internas.
 *
 * Cada verbo carrega aqui a cor que vai carregar no site inteiro (`data-acento`):
 * VALORIZAR âmbar, SIMPLIFICAR céu, AVANÇAR osso. É a recomendação §3 da
 * engenharia reversa — cor como argumento — e o que faz o leitor reconhecer o
 * sistema nas páginas internas sem precisar lê-lo de novo. Cor nunca comunica
 * sozinha: o número e o preenchimento da faixa mudam junto.
 *
 * Travas do sticky: `overflow: clip` (nunca `hidden`) em qualquer ancestral, e
 * nenhum `transform` em ancestral de quem gruda.
 */
export function Compromissos() {
  const raiz = useRef(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    revelar(no.querySelector(".rotulo"));
    digitar(no.querySelector(".compromissos__titulo"), { atraso: 60, naRolagem: true });
    revelarEmCascata(no.querySelectorAll(".carta"), { intervalo: 90 });
  }, []);

  return (
    <section id="compromissos" className="bloco compromissos" ref={raiz}>
      <div className="envelope compromissos__grade">
        <header className="compromissos__cabeca">
          <Rotulo>o que faremos</Rotulo>
          <h2 className="compromissos__titulo titulo h1" data-revelar>
            {COMPROMISSOS.titulo}
          </h2>
          <p className="compromissos__sub body prosa">
            O mesmo verbo em toda a campanha. O complemento muda conforme o
            público, e é ele que aparece adaptado nas três páginas internas.
          </p>
        </header>

        <ol className="baralho">
          {COMPROMISSOS.itens.map(({ nome, texto }, indice) => (
            <li
              className="carta"
              key={nome}
              data-acento={VERBOS[indice].cor}
              data-revelar
              style={{ "--ordem": indice }}
            >
              <span className="carta__faixa" aria-hidden="true" />
              <span className="carta__indice mono-reg" data-num>
                [{String(indice + 1).padStart(2, "0")} de 03]
              </span>
              <h3 className="carta__titulo display">{nome}</h3>
              <p className="carta__texto body prosa">{texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
