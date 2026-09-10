import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { PUBLICOS } from "./conteudo/publicos.js";
import { config } from "./config.js";

/** Usado só por `scripts/prerender.mjs`, no build. */
export function renderizar(rota) {
  return renderToString(<App rota={rota} />);
}

/**
 * Os metadados de cada rota.
 *
 * Corrige, de uma vez, as três ausências que a engenharia reversa aponta como
 * as mais caras: não havia `meta description` em nenhuma das quatro páginas,
 * não havia `og:image` nem `twitter:image` (com `twitter:card` pedindo cartão
 * grande), e o nome do projeto vazava sem acento — `CHAPA 3 | Marcao` — para
 * o `<title>` de todas elas.
 *
 * Um site institucional é encontrado por busca; um site de campanha é
 * COMPARTILHADO, e o preview do link é a peça publicitária.
 */
export const SITE = config.site;

export const ROTAS = [
  {
    rota: "/",
    arquivo: "index.html",
    titulo: `Chapa ${config.chapa} · Marcão + Ciel · Reitoria FURB`,
    descricao:
      "União e Gestão com Responsabilidade. Os três pilares, os três compromissos e o método de cinco etapas da Chapa 3 para uma FURB mais conectada, simples e humana.",
  },
  ...Object.values(PUBLICOS).map((pagina) => ({
    rota: pagina.rota,
    // Dois arquivos por rota interna, e não é redundância: hospedagem estática
    // resolve `/professores` ora por `professores.html`, ora por
    // `professores/index.html`, e nenhuma das duas convenções é universal.
    // Escrever as duas faz o link funcionar com e sem barra no fim em
    // qualquer servidor — inclusive no `vite preview`, que sem isto devolve a
    // home para `/professores` e quebra a hidratação.
    arquivo: [`${pagina.rota.slice(1)}.html`, `${pagina.rota.slice(1)}/index.html`],
    titulo: `${pagina.titulo} · Chapa ${config.chapa} · Marcão + Ciel`,
    descricao: pagina.descricao,
  })),
];
