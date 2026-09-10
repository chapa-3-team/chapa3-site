import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Quatro rotas, um bundle, build estático, sem CDN em execução.
 *
 * `rotasNoDev` existe porque as outras três páginas só nascem no build
 * (`scripts/prerender.mjs`). Em `npm run dev` o servidor devolveria 404 para
 * `/professores`; estas cinco linhas mandam o mesmo `index.html`, e o cliente
 * decide a rota pelo `pathname`. É exatamente o que um servidor estático faz
 * em produção com fallback de SPA — e nem isso é necessário lá, porque os
 * quatro arquivos existem em disco.
 */
const rotasNoDev = {
  name: "rotas-no-dev",
  configureServer(servidor) {
    servidor.middlewares.use((req, _res, proximo) => {
      if (/^\/(professores|tecnicos|estudantes)\/?$/.test(req.url ?? "")) req.url = "/";
      proximo();
    });
  },
};

export default defineConfig({
  plugins: [react(), rotasNoDev],
  build: {
    target: "es2020",
    assetsInlineLimit: 2048,
    // `scripts/check-size.mjs` já mede o gzip contra o teto, e a conta do Vite
    // refaz a mesma compressão em cada arquivo, só para imprimir.
    reportCompressedSize: false,
  },
});
