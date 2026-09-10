import { useEffect, useRef } from "react";
import { Rotulo } from "../components/Rotulo.jsx";
import { carimbar, digitar, revelar, revelarEmCascata } from "../motion/index.js";

/**
 * O bloco de reforço específico de cada público.
 *
 * As três páginas têm o mesmo esqueleto, e este é o único ponto em que o
 * conteúdo muda de FORMA e não só de texto:
 *
 *   `nota`     Professores · a nota sobre a ETEVI, em selo carimbado (LG-16):
 *              um aviso isolado, fora do eixo, com cruz de registro. A forma
 *              diz o que o texto diz — o ensino médio não é uma extensão da
 *              graduação, então o bloco também não é.
 *   `saber`    Técnicos · as cinco frases "Quem trabalha com… conhece…" como
 *              lista de evidência, e a tese em escala de cartaz.
 *   `cartoes`  Estudantes · Permanência, Assistência e Formação em três
 *              cards, que é a forma que o próprio site usa.
 *
 * Três ramos num arquivo, sem fábrica e sem interface: são três, e são estes.
 */
export function Reforco({ reforco }) {
  const raiz = useRef(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    revelar(no.querySelector(".rotulo"));
    revelarEmCascata(no.querySelectorAll("[data-revelar].cascata"), { intervalo: 90 });
    digitar(no.querySelectorAll(".reforco__linhas .linha__texto"), {
      naRolagem: true,
      pai: no.querySelector(".reforco__linhas"),
    });
    const selo = no.querySelector(".selo");
    if (selo) carimbar(selo, { naRolagem: true });
  }, []);

  if (reforco.tipo === "nota") return <Nota {...reforco} raiz={raiz} />;
  if (reforco.tipo === "saber") return <Saber {...reforco} raiz={raiz} />;
  return <Cartoes {...reforco} raiz={raiz} />;
}

function Nota({ titulo, paragrafos, raiz }) {
  return (
    <section id="reforco" className="bloco reforco reforco--nota" ref={raiz}>
      <div className="envelope reforco__grade">
        <Rotulo>uma ressalva</Rotulo>
        <article className="selo">
          <span className="selo__cruz selo__cruz--se" aria-hidden="true" />
          <span className="selo__cruz selo__cruz--sd" aria-hidden="true" />
          <span className="selo__cruz selo__cruz--ie" aria-hidden="true" />
          <span className="selo__cruz selo__cruz--id" aria-hidden="true" />
          <h2 className="selo__titulo h1">{titulo}</h2>
          {paragrafos.map((p) => (
            <p className="selo__texto body-lg prosa" key={p}>
              {p}
            </p>
          ))}
          <span className="selo__registro mono-reg" data-num>
            [ETEVI · ensino médio · FURB]
          </span>
        </article>
      </div>
    </section>
  );
}

function Saber({ conhece, titulo, linhas, paragrafos, tese, depois, raiz }) {
  return (
    <section id="reforco" className="bloco reforco reforco--saber" data-theme="cartaz" ref={raiz}>
      <div className="envelope">
        <Rotulo>o que só quem faz sabe</Rotulo>

        <ul className="conhece">
          {conhece.map((frase) => (
            <li className="conhece__item body-lg cascata" key={frase} data-revelar>
              {frase}
            </li>
          ))}
        </ul>
      </div>

      <div className="envelope reforco__meio">
        <h2 className="reforco__titulo h1">{titulo}</h2>
        <p className="reforco__linhas display">
          {linhas.map((linha) => (
            <span className="linha" key={linha}>
              <span className="linha__texto">{linha}</span>
            </span>
          ))}
        </p>
        {paragrafos.map((p) => (
          <p className="reforco__p body-lg prosa cascata" key={p} data-revelar>
            {p}
          </p>
        ))}
      </div>

      <div className="envelope reforco__tese-bloco">
        <p className="reforco__tese display">{tese}</p>
        {depois.map((p) => (
          <p className="reforco__p body-lg prosa cascata" key={p} data-revelar>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function Cartoes({ titulo, subtitulo, paragrafos, cartoes, raiz }) {
  return (
    <section id="reforco" className="bloco reforco reforco--cartoes" ref={raiz}>
      <div className="envelope">
        <Rotulo>o mesmo compromisso</Rotulo>
        <h2 className="reforco__titulo display">{titulo}</h2>
        <p className="reforco__sub h2">{subtitulo}</p>
        <div className="reforco__prosa">
          {paragrafos.map((p) => (
            <p className="reforco__p body-lg prosa cascata" key={p} data-revelar>
              {p}
            </p>
          ))}
        </div>

        <ul className="cartoes">
          {cartoes.map(({ nome, texto }, indice) => (
            <li
              className="cartao cascata"
              key={nome}
              data-revelar
              data-acento={["ambar", "ceu", "osso"][indice]}
            >
              <span className="cartao__n mono-reg" data-num>
                [{String(indice + 1).padStart(2, "0")}]
              </span>
              <h3 className="cartao__nome h2">{nome}</h3>
              <p className="cartao__texto body">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
