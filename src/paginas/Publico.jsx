import { Botao } from "../components/Botao.jsx";
import { Painel } from "../components/Painel.jsx";
import { Enquadramento } from "../secoes/Enquadramento.jsx";
import { Metodo } from "../secoes/Metodo.jsx";
import { Propostas } from "../secoes/Propostas.jsx";
import { Reforco } from "../secoes/Reforco.jsx";

/**
 * As três páginas internas, num componente só.
 *
 * O esqueleto é idêntico — capa, enquadramento, três blocos de propostas,
 * reforço do público, método em cinco etapas, fecho — e o conteúdo vem de
 * `conteudo/publicos.js`. É o "CMS relacional feito à mão" do site de origem
 * (§4.3) escrito como o que ele sempre foi: um molde e três conjuntos de
 * dados.
 *
 * O CTA da capa aponta para `#propostas`, na própria página. No site
 * publicado, o CTA da página de Estudantes aponta de volta para a home,
 * enquanto as propostas estão logo abaixo — o link circular do §4.3.
 */
export const SECOES_PUBLICO = [
  "inicio",
  "enquadramento",
  "propostas",
  "reforco",
  "metodo",
  "fechamento",
];

export function Publico({ pagina }) {
  const { capa, enquadramento, blocos, reforco, metodo, fecho, quem, rota } = pagina;
  // Sufixo de página: cada capa/fecho tem linhas compostas à mão diferentes,
  // e cada uma precisa do próprio tamanho medido — não dá pra dividir uma
  // classe genérica entre conteúdos de largura tão diferente (§ CSS de
  // `.painel__titulo`, ao lado de cada regra `.painel--*-<slug>`).
  const slug = rota.replace("/", "");

  return (
    <>
      <Painel
        como="header"
        id="inicio"
        className={`painel--capa painel--capa-${slug}`}
        kicker={capa.kicker}
        linhas={capa.linhas}
        manchete={capa.manchete}
        remate={capa.remate}
        corpo={capa.legenda}
        crus={capa.crus}
        acao={
          <>
            <a className="botao botao--fantasma label" href="#propostas">
              <span className="botao__rolo">
                <span className="botao__rotulo">CONHEÇA NOSSAS PROPOSTAS</span>
                <span className="botao__rotulo" aria-hidden="true">
                  CONHEÇA NOSSAS PROPOSTAS
                </span>
              </span>
              <span className="botao__seta" aria-hidden="true">
                &#8595;
              </span>
            </a>
            <span className="microregistro mono-reg">
              [{blocos.reduce((s, b) => s + b.itens.length, 0)} propostas · 5 etapas de método]
            </span>
          </>
        }
      />

      <Enquadramento {...enquadramento} />

      <Propostas blocos={blocos} quem={quem} />
      <Reforco reforco={reforco} />
      <Metodo etapas={metodo} />

      <Painel
        id="fechamento"
        className={`painel--fechamento painel--fechamento-${slug}`}
        kicker={fecho.kicker}
        linhas={fecho.linhas}
        remate={fecho.remate}
        naRolagem
        acao={
          <>
            <div className="fecho__prosa">
              {fecho.paragrafos.map((p) => (
                <p className="body-lg prosa" key={p}>
                  {p}
                </p>
              ))}
            </div>
            <Botao rotulo={fecho.cta} assunto={`Mensagem de quem lê a página de ${quem}`} />
          </>
        }
      />
    </>
  );
}
