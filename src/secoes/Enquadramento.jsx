import { useEffect, useRef } from "react";
import { Rotulo } from "../components/Rotulo.jsx";
import { acenderEmSequencia, revelar, revelarEmCascata } from "../motion/index.js";

/**
 * O enquadramento: o parágrafo que diz por que esta página existe.
 *
 * É o texto que, no site publicado, ora está marcado como `h1`, ora como
 * `h2`, ora como parágrafo, conforme a página — o sintoma clássico de
 * construtor visual que a engenharia reversa §2.1 documenta: escolher o
 * "Título 5" porque parece do tamanho certo. Aqui é `h2` mais parágrafos, uma
 * hierarquia só, e a escala vem da classe.
 *
 * A tese, quando existe, é a frase longa em caixa mista com peso alto — não
 * em caixa alta. Frase de dezoito palavras em caixa alta elimina a silhueta
 * das palavras e custa velocidade de leitura de verdade; a regra prática é
 * caixa alta até seis palavras.
 *
 * A tese acende palavra a palavra, ligada à rolagem: é a única frase da
 * página que ganha esse tratamento, e por isso ele significa alguma coisa.
 */
export function Enquadramento({ titulo, paragrafos, tese, depois }) {
  const raiz = useRef(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    revelar(no.querySelector(".rotulo"));
    revelar(no.querySelector(".enquadramento__titulo"), { atraso: 60 });
    revelarEmCascata(no.querySelectorAll(".enquadramento__p"), { intervalo: 80 });
    const palco = no.querySelector(".enquadramento__tese");
    if (palco) {
      const anim = acenderEmSequencia(palco.querySelectorAll(".palavra"), palco, {
        classeAtual: "palavra--atual",
      });
      return () => anim?.revert?.();
    }
  }, []);

  return (
    <section id="enquadramento" className="bloco enquadramento" ref={raiz}>
      <div className="envelope enquadramento__grade">
        <header className="enquadramento__cabeca">
          <Rotulo>o ponto de partida</Rotulo>
          <h2 className="enquadramento__titulo h1" data-revelar>
            {titulo}
          </h2>
        </header>

        <div className="enquadramento__corpo">
          {paragrafos.map((p) => (
            <p className="enquadramento__p body-lg prosa" key={p} data-revelar>
              {p}
            </p>
          ))}
        </div>
      </div>

      {tese ? (
        <div className="enquadramento__palco">
          <div className="envelope">
            <p className="enquadramento__tese display">
              {tese.split(" ").map((palavra, i) => (
                <span key={`${palavra}-${i}`}>
                  <span className="palavra">{palavra}</span>{" "}
                </span>
              ))}
            </p>
            {depois?.map((p) => (
              <p className="enquadramento__depois body-lg prosa" key={p}>
                {p}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
