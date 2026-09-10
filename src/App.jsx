import { useEffect } from "react";
import "lenis/dist/lenis.css";
import "./styles/tokens/cor.css";
import "./styles/tokens/forma-espaco.css";
import "./styles/tokens/movimento.css";
import "./styles/tokens/tipografia.css";
import "./styles/fontes.css";
import "./styles/base.css";
import "./styles/pagina.css";

import { Cabecalho } from "./components/Cabecalho.jsx";
import { AoTopo, IndiceFixo } from "./components/IndiceFixo.jsx";
import { Rodape } from "./components/Rodape.jsx";
import { Home, SECOES_HOME } from "./paginas/Home.jsx";
import { Publico, SECOES_PUBLICO } from "./paginas/Publico.jsx";
import { PUBLICOS } from "./conteudo/publicos.js";
import { garantirVisibilidade, ligarLenis } from "./motion/index.js";

/**
 * Quatro rotas, quatro arquivos HTML, nenhum roteador.
 *
 * `scripts/prerender.mjs` escreve `/index.html`, `/professores/index.html`,
 * `/tecnicos/index.html` e `/estudantes/index.html`, cada um com o próprio
 * `<title>`, `meta description` e cartão social — que é a Nota metodológica 1
 * da engenharia reversa, a falha mais cara do site publicado. A navegação é
 * `<a href>` comum: o navegador carrega a página, o histórico funciona sozinho
 * e não há estado de rota para manter sincronizado.
 *
 * Sem JavaScript as quatro páginas abrem inteiras e legíveis: o HTML já vem
 * pronto do build e o cliente só hidrata.
 */
export function rotaAtual() {
  if (typeof window === "undefined") return "/";
  const caminho = window.location.pathname.replace(/\/+$/, "") || "/";
  return PUBLICOS[caminho] ? caminho : "/";
}

export function App({ rota = "/" }) {
  const pagina = PUBLICOS[rota];
  const secoes = pagina ? SECOES_PUBLICO : SECOES_HOME;

  useEffect(() => {
    const pararRede = garantirVisibilidade();
    const pararLenis = ligarLenis();
    return () => {
      pararRede();
      pararLenis();
    };
  }, []);

  return (
    <>
      <a className="pular label" href="#conteudo">
        Pular para o conteúdo
      </a>

      <span id="topo" />
      <Cabecalho rota={rota} />

      <main id="conteudo">{pagina ? <Publico pagina={pagina} /> : <Home />}</main>

      <Rodape />
      <IndiceFixo ids={secoes} />
      <AoTopo />
    </>
  );
}
