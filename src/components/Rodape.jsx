import { Botao } from "./Botao.jsx";
import { Rotulo } from "./Rotulo.jsx";
import { Simbolo } from "./Simbolo.jsx";
import { NAVEGACAO } from "../conteudo/comum.js";
import { config, mailto } from "../config.js";

/**
 * O e-mail não tem espaço nenhum, então sem ajuda o navegador só tem um jeito
 * de quebrar linha numa tela estreita: `overflow-wrap: anywhere` corta no meio
 * de uma palavra, em qualquer letra — "marcaoeci" numa linha, "el@gmail.com"
 * na outra. Aqui ele ganha um `<wbr>` (ponto de quebra, sem largura, sem
 * hífen) só depois do `@`: é a junta natural do endereço — usuário de um
 * lado, domínio do outro — e a única que cabe inteira em qualquer largura
 * testada, então a quebra fica no mesmo lugar do celular ao desktop.
 */
function EmailComQuebra({ endereco }) {
  const [usuario, dominio] = endereco.split("@");
  return (
    <>
      {usuario}@<wbr />
      {dominio}
    </>
  );
}

/**
 * O rodapé (LG-18), em quatro colunas mais a faixa final.
 *
 * O rodapé do site publicado é mínimo — slogan, copyright, e-mail e o rótulo
 * "Contato" — e a engenharia reversa §4.5 registra o custo: para uma campanha
 * o rodapé é a segunda chance de conversão, e ele está vazio. Sem redes, sem
 * repetição da navegação, sem data de eleição.
 *
 * Aqui entra só o que existe de verdade:
 *
 *   - `(contato)` com UM e-mail, o mesmo do site inteiro (Nota metodológica 2).
 *   - `(navegação)` repetida, por público, que é a arquitetura da campanha.
 *   - `(a chapa)` com os pilares, que são o índice conceitual da home.
 *   - A faixa final no acento, com o símbolo e a síntese que o site repete em
 *     todas as páginas.
 *
 * Rede social e data de eleição ficam de fora enquanto ninguém as fornecer:
 * link inventado num site de campanha é pior que ausência.
 */
const ANCORAS_HOME = [
  ["/#pilares", "Os três pilares"],
  ["/#compromissos", "Os três compromissos"],
  ["/#identidade", "8 partes, 1 propósito"],
];

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="envelope rodape__grade">
        <div className="rodape__contato">
          <p className="rodape__par">
            <Rotulo>contato</Rotulo>
            <a
              className="rodape__grande rodape__grande--acento h2"
              href={mailto(`Chapa ${config.chapa} — contato pelo site`)}
            >
              <EmailComQuebra endereco={config.contato.email} />
            </a>
          </p>
          <p className="rodape__par">
            <Rotulo>chapa</Rotulo>
            <span className="rodape__grande h2">
              {config.nomes} · Chapa {config.chapa} · Reitoria FURB
            </span>
          </p>
        </div>

        <nav className="rodape__coluna" aria-label="Páginas do site">
          <Rotulo>quem faz a FURB</Rotulo>
          <ul className="rodape__lista">
            {NAVEGACAO.map(({ rota, nome }) => (
              <li key={rota}>
                <a className="rodape__link h3" href={rota}>
                  {nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="rodape__coluna" aria-label="Seções da página inicial">
          <Rotulo>a campanha</Rotulo>
          <ul className="rodape__lista">
            {ANCORAS_HOME.map(([href, nome]) => (
              <li key={href}>
                <a className="rodape__link h3" href={href}>
                  {nome}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rodape__aviso">
          <p className="caption prosa">
            Escutar não é uma etapa só de comunicação. Se você tem uma proposta,
            uma crítica ou uma dúvida sobre o plano, escreva — a mensagem chega
            direto na chapa.
          </p>
          <Botao rotulo="Fale com a chapa" assunto="Mensagem pelo rodapé do site" fantasma />
        </div>
      </div>

      <div className="envelope rodape__base">
        <p className="mono-reg" data-num>
          {config.copyright}
        </p>
        <p className="caption rodape__nota">
          Conteúdo das propostas conforme publicado pela chapa.
        </p>
      </div>

      <div className="rodape__faixa">
        <div className="envelope rodape__faixa-grade">
          <Simbolo className="rodape__simbolo" cor="atual" />
          <p className="rodape__sintese display">{config.sintese}</p>
        </div>
      </div>
    </footer>
  );
}
