import { useEffect, useRef } from "react";
import { Rotulo } from "../components/Rotulo.jsx";
import { acenderEmSequencia, digitar, revelarEmCascata } from "../motion/index.js";
import { PILARES } from "../conteudo/home.js";

/**
 * Os três pilares, em manifesto assimétrico (LG-11) mais slides numéricos
 * (LG-13).
 *
 * A pergunta que abre a seção — "O que significa União e Gestão com
 * Responsabilidade?" — é o título, quebrado à mão em linhas que sobem de
 * dentro do recorte. A tese cai deslocada para a direita e para baixo, onde o
 * título termina: é o que faz a composição ler como cartaz e não como slide.
 *
 * Os três pilares vêm depois, cada um com o número grande no lugar da imagem.
 * A definição de cada um acende PALAVRA A PALAVRA conforme a página desce,
 * ligada à rolagem e não disparada por ela: são definições curtas e o
 * movimento faz o leitor lê-las, em vez de pular.
 */
export function Pilares() {
  const raiz = useRef(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    digitar(no.querySelectorAll(".pilares__titulo .linha__texto"), {
      naRolagem: true,
      pai: no.querySelector(".pilares__titulo"),
    });
    revelarEmCascata(no.querySelectorAll(".pilar"), { intervalo: 90 });
    const animacoes = [...no.querySelectorAll(".pilar")].map((pilar) =>
      acenderEmSequencia(pilar.querySelectorAll(".palavra"), pilar),
    );
    return () => animacoes.forEach((a) => a?.revert?.());
  }, []);

  return (
    <section id="pilares" className="bloco pilares" data-theme="cartaz" ref={raiz}>
      <div className="envelope">
        <div className="pilares__manifesto">
          <Rotulo>o que acreditamos</Rotulo>
          <h2 className="pilares__titulo" data-revelar>
            {["O que significa", "União e Gestão com", "Responsabilidade?"].map((linha) => (
              <span className="linha" key={linha}>
                <span className="linha__texto">{linha}</span>
              </span>
            ))}
          </h2>
          <p className="pilares__tese body-lg prosa">{PILARES.tese}</p>
        </div>

        <ol className="pilares__lista">
          {PILARES.itens.map(({ nome, texto }, indice) => (
            <li className="pilar" key={nome} data-revelar>
              <span className="pilar__numero display-xxl" aria-hidden="true" data-num>
                {indice + 1}
              </span>
              <h3 className="pilar__nome h1">{nome}</h3>
              <p className="pilar__texto body">
                {texto.split(" ").map((palavra, i) => (
                  // O espaço fica FORA do span: espaço no fim de um
                  // inline-block é descartado, e as palavras colam.
                  <span key={`${palavra}-${i}`}>
                    <span className="palavra">{palavra}</span>{" "}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
