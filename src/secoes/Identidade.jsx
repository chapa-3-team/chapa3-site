import { useEffect, useRef } from "react";
import { Botao } from "../components/Botao.jsx";
import { Rotulo } from "../components/Rotulo.jsx";
import { Simbolo } from "../components/Simbolo.jsx";
import { CampoDePontos, TriangulosSoltos } from "../components/PontosFlutuantes.jsx";
import { acenderEmSequencia, digitar, revelar } from "../motion/index.js";
import { IDENTIDADE } from "../conteudo/home.js";
import { TRIANGULOS } from "../conteudo/comum.js";

/**
 * "8 PARTES · 1 PROPÓSITO": o símbolo se monta enquanto se lê.
 *
 * Explicar a própria marca é raro, e a engenharia reversa registra isso como
 * um dos maiores acertos do site: dá ao símbolo uma história repetível, e
 * história repetível é o que faz um símbolo circular. Só que no site
 * publicado essa história é uma captura de tela — os oito nomes e as oito
 * definições estão rasterizados dentro de um PNG de 980px, invisíveis para
 * busca e para leitor de tela.
 *
 * Aqui a seção É o argumento: o símbolo fica grudado no meio da tela, os oito
 * triângulos começam apagados, e cada um acende junto com a sua parte escrita
 * conforme a página desce. "Separados, representam diferentes forças. Juntos,
 * formam um único todo" — dito pela própria peça, não sobre ela.
 *
 * O palco é quem MEDE a travessia; o bloco grudado é quem exibe. Quem gruda
 * nunca é quem mede. Sob movimento reduzido tudo nasce aceso: os oito nomes
 * INFORMAM, e informação não depende de animação.
 *
 * O fundo é o mesmo campo de pontos + partículas soltas da capa
 * (`components/PontosFlutuantes.jsx`), sem nenhuma prop de cor: a seção é
 * Cartaz (`data-theme="cartaz"`), e os dois componentes leem `--bone`/
 * `--line`/`--ambar-area` do próprio elemento, então herdam o papel em vez do
 * azul institucional automaticamente.
 */
export function Identidade() {
  const raiz = useRef(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    digitar(no.querySelectorAll(".identidade__titulo .linha__texto"), {
      naRolagem: true,
      pai: no.querySelector(".identidade__titulo"),
    });
    revelar(no.querySelector(".identidade__prosa"));
    revelar(no.querySelector(".identidade__chamada"));
    const anim = acenderEmSequencia(
      no.querySelectorAll(".parte"),
      no.querySelector(".identidade__palco"),
      { classe: "acesa", classeAtual: "atual", espelho: no.querySelectorAll(".simbolo__parte") },
    );
    return () => anim?.revert?.();
  }, []);

  return (
    <section id="identidade" className="bloco identidade" data-theme="cartaz" ref={raiz}>
      <CampoDePontos />
      <TriangulosSoltos />

      <div className="envelope">
        <header className="identidade__cabeca">
          <Rotulo>a identidade</Rotulo>
          <h2 className="identidade__titulo display-xxl" data-revelar>
            {IDENTIDADE.titulo.map((linha, indice) => (
              <span className="linha" key={linha}>
                <span className={`linha__texto${indice ? " vazado" : ""}`}>{linha}</span>
              </span>
            ))}
          </h2>
        </header>

        <div className="identidade__prosa pilha" data-revelar>
          {IDENTIDADE.paragrafos.map((paragrafo) => (
            <p className="body-lg prosa" key={paragrafo}>
              {paragrafo}
            </p>
          ))}
        </div>
      </div>

      <div className="identidade__palco">
        <div className="envelope identidade__grade">
          <div className="identidade__figura">
            <Simbolo
              className="identidade__simbolo"
              titulo="O símbolo da campanha: oito triângulos que, juntos, formam um todo."
            />
          </div>

          <ol className="partes">
            {TRIANGULOS.map(({ n, nome, texto }) => (
              <li className="parte" key={nome}>
                <span className="parte__n mono-reg" data-num>
                  {String(n).padStart(2, "0")}
                </span>
                <h3 className="parte__nome h2">{nome}</h3>
                <p className="parte__texto body">{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="envelope">
        <div className="identidade__chamada chamada" data-revelar>
          <Botao
            rotulo={IDENTIDADE.cta}
            assunto="Quero conversar sobre as propostas"
          />
          <span className="microregistro mono-reg">
            Oito partes, um propósito. A mensagem chega direto na chapa.
          </span>
        </div>
      </div>
    </section>
  );
}
