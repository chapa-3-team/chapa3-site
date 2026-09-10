import { useEffect, useRef } from "react";
import { Moldura } from "./Moldura.jsx";
import { Rotulo } from "./Rotulo.jsx";
import { abrirPainel } from "../motion/index.js";

/** Fio de 1px como grade de painel. Entra desenhado, da esquerda. */
export function Fio() {
  return (
    <svg className="painel__fio" viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * O painel de tela cheia (LG-02): capa e fecho, nas quatro páginas.
 *
 * A manchete é TIPOGRAFIA COMO ARQUITETURA — linhas compostas à mão, cada uma
 * subindo de dentro do próprio recorte, encostando nas bordas do envelope. É
 * a única escala `display-xxl` da página e ela aparece duas vezes: a capa e o
 * fecho. Aparecer pouco é o que a mantém como assinatura.
 *
 * `100svh`, nunca `100vh`: no celular a barra do navegador entra e sai, e é
 * exatamente no celular que 80% dos eleitores vão abrir este link.
 *
 * A ordem de entrada é a ordem de leitura: a moldura desenha o campo, os fios
 * abrem a grade, as linhas sobem, e só então o corpo e o botão.
 */
export function Painel({
  id,
  className = "",
  etiqueta,
  kicker,
  linhas,
  remate,
  manchete,
  corpo,
  acao,
  crus,
  rodape,
  naRolagem = false,
  como = "section",
  children,
}) {
  const raiz = useRef(null);
  const Tag = como;

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;
    return abrirPainel({
      moldura: no.querySelectorAll(".moldura path"),
      fios: no.querySelectorAll(".painel__fio line"),
      kicker: no.querySelector(".painel__kicker"),
      titulo: no.querySelector(".painel__titulo"),
      linhas: no.querySelectorAll(".linha__texto"),
      corpo: no.querySelector(".painel__corpo"),
      acao: no.querySelector(".painel__acao"),
      rodape: no.querySelector(".painel__rodape"),
      seta: no.querySelector(".painel__seta"),
      naRolagem,
    });
  }, [naRolagem]);

  const Titulo = como === "header" ? "h1" : "h2";

  return (
    <Tag className={`painel grao ${className}`.trim()} id={id} ref={raiz} aria-label={etiqueta}>
      <Moldura />

      <div className="painel__centro envelope">
        {kicker ? <Rotulo className="painel__kicker">{kicker}</Rotulo> : null}

        <Fio />
        <Titulo className={`painel__titulo ${manchete ? "painel__titulo--frase" : "display-xxl"}`} data-revelar>
          {manchete ? (
            <span className="linha">
              <span className="linha__texto">{manchete}</span>
            </span>
          ) : (
            linhas.map((linha, indice) => (
              <span className="linha" key={linha}>
                <span className={`linha__texto${indice % 2 ? " vazado" : ""}`}>{linha}</span>
              </span>
            ))
          )}
        </Titulo>
        {remate ? (
          <p className="painel__remate h1" data-revelar>
            {remate}
          </p>
        ) : null}
        <Fio />

        {corpo ? (
          <p className="painel__corpo body-lg" data-revelar>
            {corpo}
          </p>
        ) : null}

        {acao ? (
          <div className="painel__acao" data-revelar>
            {acao}
          </div>
        ) : null}

        {children}
      </div>

      {crus || rodape ? (
        <div className="painel__rodape envelope" data-revelar>
          {rodape ?? (
            <span className="rolar overline" aria-hidden="true">
              <span>role</span>
              <span>para ver</span>
              <span className="painel__seta">&#8595;</span>
            </span>
          )}
          {crus ? (
            <ul className="crus mono-reg" data-num>
              {crus.map(([numero, nome]) => (
                <li key={nome}>
                  <b>{numero}</b> {nome}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </Tag>
  );
}
