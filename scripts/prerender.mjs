/**
 * Escreve as quatro páginas do site dentro de `dist/`.
 *
 * Existem duas razões, e as duas vêm da engenharia reversa:
 *
 *   1. **Sem JavaScript a página precisa abrir inteira.** Uma SPA React
 *      entrega `<div id="raiz"></div>` e mais nada — num site que é, na
 *      prática, um documento de plano de gestão, isso seria entregar página
 *      em branco para busca, para leitor de tela em rede ruim e para quem
 *      abre o link em 4G no meio de uma reunião de departamento.
 *   2. **Cada rota precisa dos próprios metadados.** O site publicado não tem
 *      `meta description` em nenhuma das quatro páginas, não tem `og:image`
 *      nem `twitter:image` (com `twitter:card` pedindo cartão grande) e vaza
 *      `Marcao`, sem acento, para todos os títulos. Um site de campanha é
 *      compartilhado antes de ser buscado: o preview do link É a peça.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const molde = join(raiz, "dist", "index.html");

const { renderizar, ROTAS, SITE } = await import(
  pathToFileURL(join(raiz, "dist-ssr", "entry-server.js")).href
);

if (!SITE) {
  console.warn(
    "prerender  AVISO: config.site está vazio. As URLs de canonical, og:url e\n" +
      "           og:image saem relativas, e cartão social com caminho relativo\n" +
      "           NÃO é buscado pelo WhatsApp nem pelo Twitter. Preencha antes\n" +
      "           de publicar — é a correção de maior impacto da lista.",
  );
}

const base = await readFile(molde, "utf8");
const marcador = "<!--app-html-->";
if (!base.includes(marcador)) {
  console.error(`prerender  marcador ${marcador} sumiu de index.html`);
  process.exit(1);
}

/**
 * Declara os pedaços preguiçosos no `<head>`.
 *
 * O Vite só escreve `<script>` para o pedaço de entrada. Um pedaço que entra
 * por `import()` fica invisível para o navegador até o pacote principal
 * executar e pedir por ele, e aí começa uma ida e volta inteira do zero, em
 * série — foi o que aconteceu com o módulo de texto do anime.js, que é quem
 * revela o título da capa. `modulepreload` põe o pedido junto do principal.
 */
const preguicosos = (await readdir(join(raiz, "dist", "assets")))
  .filter((nome) => nome.endsWith(".js") && !base.includes(nome))
  .map((nome) => `    <link rel="modulepreload" crossorigin href="/assets/${nome}">`)
  .join("\n");

const escapar = (texto) => texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

for (const { rota, arquivo, titulo, descricao } of ROTAS) {
  let saida = base
    .replace(marcador, renderizar(rota))
    .replace(/<title>[^<]*<\/title>/, `<title>${escapar(titulo)}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${escapar(descricao)}$2`,
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE}${rota}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE}${rota}$2`)
    .replaceAll('content="/img/og.jpg"', `content="${SITE}/img/og.jpg"`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapar(titulo)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapar(titulo)}$2`)
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${escapar(descricao)}$2`,
    )
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${escapar(descricao)}$2`,
    );

  if (preguicosos) saida = saida.replace("</head>", `${preguicosos}\n  </head>`);

  for (const nome of [arquivo].flat()) {
    const destino = join(raiz, "dist", nome);
    await mkdir(dirname(destino), { recursive: true });
    await writeFile(destino, saida, "utf8");
  }
}

console.log(
  `prerender  ${ROTAS.length} páginas escritas` +
    (preguicosos ? ", pedaços preguiçosos em modulepreload" : ""),
);
