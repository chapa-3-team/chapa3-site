import { useEffect, useState } from "react";
import { Simbolo } from "./Simbolo.jsx";
import { NAVEGACAO } from "../conteudo/comum.js";
import { config, mailto, CTA_PADRAO } from "../config.js";

/**
 * O cabeçalho, idêntico nas quatro páginas.
 *
 * Três coisas que ele conserta em relação ao site publicado:
 *
 *   1. **Nada de terceiro no topo.** A primeira coisa clicável do site atual
 *      é a faixa de anúncio do Wix, em todas as páginas, e ela leva para
 *      fora. Numa peça de campanha o topo é o espaço mais caro que existe.
 *   2. **Estado ativo.** Hoje não há indicação de em qual página o visitante
 *      está (RE §5.2). Aqui o item da página corrente carrega `aria-current`
 *      e um fio embaixo — forma, não só cor.
 *   3. **O logo tem `src` e `alt` de verdade** (RE §4.1: a extração devolveu
 *      o logo vazio). O símbolo é SVG inline, então nem depende de rede.
 *
 * Ele encolhe ao rolar em vez de sumir: numa página de trinta propostas o
 * visitante precisa poder trocar de público a qualquer altura, e é a única
 * navegação do site.
 */
export function Cabecalho({ rota }) {
  const [encolhido, definirEncolhido] = useState(false);

  useEffect(() => {
    let agendado = 0;
    const medir = () => {
      agendado = 0;
      definirEncolhido(window.scrollY > 120);
    };
    const aoRolar = () => {
      if (!agendado) agendado = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(agendado);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  return (
    <header className={`cabecalho${encolhido ? " cabecalho--encolhido" : ""}`}>
      <div className="cabecalho__grade">
        <a className="marca" href="/" aria-label="Chapa 3 · Marcão + Ciel · página inicial">
          <Simbolo className="marca__simbolo" />
          <span className="marca__nome label">
            Marcão <span className="marca__mais" aria-hidden="true">+</span> Ciel
          </span>
        </a>

        <nav className="cabecalho__nav" aria-label="Navegação principal">
          <ul className="cabecalho__lista">
            {NAVEGACAO.map(({ rota: destino, nome }) => {
              const atual = destino === rota;
              return (
                <li key={destino}>
                  <a
                    className={`cabecalho__link overline${atual ? " cabecalho__link--atual" : ""}`}
                    href={destino}
                    aria-current={atual ? "page" : undefined}
                  >
                    {nome}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a className="cabecalho__cta label" href={mailto(`Chapa ${config.chapa} — contato pelo site`)}>
          {CTA_PADRAO}
        </a>
      </div>

      <BarraEleicao />
    </header>
  );
}

/**
 * A faixa de eleição.
 *
 * A engenharia reversa §4.2 aponta a falta mais prática do site inteiro: não
 * há data, não há "como votar", não há prazo. "Uma faixa fixa com a data e o
 * link do sistema de votação seria, provavelmente, o acréscimo de maior
 * impacto prático em todo o site."
 *
 * A faixa está pronta e só falta o dado. Ela NÃO aparece enquanto
 * `config.eleicao.data` for `null`, porque data inventada em site de campanha
 * é pior que data ausente.
 */
function BarraEleicao() {
  const { dataLegivel, comoVotar } = config.eleicao;
  if (!config.eleicao.data || !dataLegivel) return null;

  return (
    <p className="faixa-eleicao overline">
      <span className="faixa-eleicao__marca" aria-hidden="true" />
      A eleição é em <b>{dataLegivel}</b>
      {comoVotar ? (
        <>
          {" · "}
          <a href={comoVotar}>
            como votar <span aria-hidden="true">&#8599;</span>
          </a>
        </>
      ) : null}
    </p>
  );
}
