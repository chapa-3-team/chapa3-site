import { useRef } from "react";
import { pulsar } from "../motion/index.js";
import { mailto } from "../config.js";

/**
 * O botão de contato.
 *
 * É um `<a href="mailto:">`, não um `<button>` com handler: sem JavaScript o
 * link continua clicável (LG-04). O rótulo é duplicado dentro de um recorte e
 * desliza no eixo Y no hover — o text roll, convenção do gênero, quinze linhas
 * de CSS; a cópia leva `aria-hidden`.
 *
 * O `assunto` vai no mailto e é o que resolve, em parte, a limitação do §6.2
 * da engenharia reversa: sem formulário não há captura, mas ao menos a
 * mensagem chega dizendo de qual página ela veio.
 *
 * `fantasma` é a variante em contorno, para onde o acento já apareceu na tela.
 */
export function Botao({ rotulo, assunto, fantasma = false, compacto = false, className = "" }) {
  const referencia = useRef(null);

  return (
    <a
      ref={referencia}
      className={`botao label${compacto ? " botao--compacto" : ""}${
        fantasma ? " botao--fantasma" : ""
      }${className ? ` ${className}` : ""}`}
      href={mailto(assunto)}
      onClick={() => pulsar(referencia.current)}
    >
      <span className="botao__rolo">
        <span className="botao__rotulo">{rotulo}</span>
        <span className="botao__rotulo" aria-hidden="true">
          {rotulo}
        </span>
      </span>
      <span className="botao__seta" aria-hidden="true">
        &#8594;
      </span>
    </a>
  );
}
