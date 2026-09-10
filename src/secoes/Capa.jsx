import { useEffect, useRef } from "react";
import { Botao } from "../components/Botao.jsx";
import { Simbolo } from "../components/Simbolo.jsx";
import { CampoDePontos, TriangulosSoltos } from "../components/PontosFlutuantes.jsx";
import { digitar, revelar } from "../motion/index.js";
import { CTA_PADRAO } from "../config.js";

/**
 * A capa: o cartaz da campanha composto em código, não colado como imagem.
 *
 * O único bitmap é o retrato; a faixa e a tipografia são geometria e texto
 * de verdade: selecionáveis, traduzíveis, indexáveis e nítidos em qualquer
 * densidade de tela. O fundo da seção é azul sólido, com um campo de pontos
 * animado por baixo (LG-07 do catálogo de layouts globais, variante malha) e
 * pontas do símbolo vagando soltas pela seção inteira, por CIMA de tudo.
 *
 * Quatro camadas, do fundo para a frente:
 *
 *   -1  o campo de pontos, atrás de tudo
 *    0  a faixa azul, que é o FUNDO do bloco de manchete
 *    1  o retrato, que oclui a faixa e o campo
 *    2  a tipografia
 *    3  os triângulos soltos, por cima de tudo — inclusive do retrato e do
 *       texto, que é o que permite vagar pela tela inteira sem sumir atrás
 *       de nada
 *
 * A faixa não tem coordenada em porcentagem: ela é o fundo do bloco que
 * carrega a manchete, então veste o texto sozinha em qualquer largura. Um
 * retângulo em `top: 20%` só fica certo na proporção em que foi medido, e o
 * tráfego aqui é 80% celular.
 */

export function Capa() {
  const raiz = useRef(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    revelar(no.querySelector(".capa__marca"), { atraso: 120, imediato: true });
    // O titulo digita; o "Chapa 3" abaixo dele nao e titulo, so sobe rapido.
    digitar(no.querySelector(".capa__titulo"), {
      atraso: 320,
      pai: no.querySelector(".capa__lockup"),
    });
    revelar(no.querySelector(".capa__chapa"), { atraso: 620, imediato: true });
    revelar(no.querySelector(".capa__sintese"), { atraso: 820, imediato: true });
    revelar(no.querySelector(".capa__acao"), { atraso: 940, imediato: true });
  }, []);

  return (
    <header className="capa" id="inicio" ref={raiz}>
      <CampoDePontos />
      <TriangulosSoltos />

      {/* O retrato entra sem `data-revelar`: ele é o candidato a LCP da página
          e revelar por opacidade adiaria a pintura que o Lighthouse cronometra. */}
      <img
        className="capa__pessoas"
        src="/img/nova.png"
        width="4800"
        height="3180"
        fetchPriority="high"
        alt="Marcão e Ciel, a Chapa 3, em ilustração nas cores da campanha"
      />

      <p className="capa__marca envelope" data-revelar>
        <Simbolo className="capa__selo" />
        <span className="capa__nome">
          Marcão{" "}
          <span className="capa__mais" aria-hidden="true">
            +
          </span>{" "}
          Ciel
        </span>
      </p>

      <div className="capa__faixa">
        <div className="capa__lockup envelope" data-revelar>
          <h1 className="capa__titulo display-xxl">
            <span className="linha">
              <span className="linha__texto">
                <span className="capa__acento">União e Gestão</span> com
              </span>
            </span>
            <span className="linha">
              <span className="linha__texto">Responsabilidade</span>
            </span>
          </h1>
          <p className="capa__chapa">
            <span className="linha">
              <span className="linha__texto">
                Chapa <b>3</b>
              </span>
            </span>
          </p>
        </div>
      </div>

      <p className="capa__sintese envelope" data-revelar>
        Uma FURB mais{" "}
        <span className="capa__grifo">
          conectada,
          <br />
          simples e humana.
        </span>
      </p>

      <div className="capa__acao envelope" data-revelar>
        <Botao rotulo={CTA_PADRAO} assunto="Chapa 3 — contato pela capa do site" />
      </div>
    </header>
  );
}
