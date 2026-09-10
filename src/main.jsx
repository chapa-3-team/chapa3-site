import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App, rotaAtual } from "./App.jsx";

/**
 * Em produção a raiz já vem preenchida pelo pré-render, então aqui é
 * hidratação. Em `npm run dev` a raiz está vazia e o caminho é o normal.
 */
const raiz = document.getElementById("raiz");
const arvore = (
  <StrictMode>
    <App rota={rotaAtual()} />
  </StrictMode>
);

if (raiz.hasChildNodes()) {
  hydrateRoot(raiz, arvore);
} else {
  createRoot(raiz).render(arvore);
}
