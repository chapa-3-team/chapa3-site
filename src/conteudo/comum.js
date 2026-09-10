/**
 * Conteudo compartilhado pelas quatro paginas.
 *
 * TODA a copy desta pasta e a do site publicado em
 * `chapa3marcaoeciel.wixsite.com/chapa3-marcaoeciel`, transcrita literalmente
 * (extracao de 06/09/2026, reconferida na fonte). Duas correcoes, as duas
 * apontadas pela engenharia reversa §8 nivel 1 como erro de revisao:
 *
 *   - "aTENDER OS ESTUDANTES..."  ->  "ATENDER OS ESTUDANTES..."
 *   - "para que a FURB preparem o futuro" -> "prepare"
 *
 * Os espacos duplos que o site usa como quebra manual de linha viraram
 * quebra de verdade (array de linhas) ou sumiram, conforme §2.1: espaco
 * digitado quebra diferente em cada largura de tela.
 */

/** A navegacao e por QUEM VOTA, nao por tipo de conteudo. E o maior acerto
 *  do site de origem (RE §4.3) e nao se mexe nela. */
export const NAVEGACAO = [
  { rota: "/", nome: "CHAPA 3" },
  { rota: "/professores", nome: "Professores" },
  { rota: "/tecnicos", nome: "Técnicos" },
  { rota: "/estudantes", nome: "Estudantes" },
];

/** Os oito triangulos do simbolo, com os nomes e definicoes do painel de
 *  identidade da campanha. No site atual isso e uma captura de tela; aqui e
 *  texto, e o texto e selecionavel, indexavel e lido por leitor de tela. */
export const TRIANGULOS = [
  { n: 1, nome: "O TODO", texto: "Visão do conjunto. Propósito que nos orienta." },
  { n: 2, nome: "ENCONTRO", texto: "Pessoas, ideias e propósitos que se encontram." },
  { n: 3, nome: "CONEXÃO", texto: "Laços que criam confiança e geram valor." },
  { n: 4, nome: "ESTRUTURA", texto: "Planejamento, organização e base sólida." },
  { n: 5, nome: "DIREÇÃO", texto: "Caminho claro, rumo certo, propósito definido." },
  { n: 6, nome: "EQUILÍBRIO", texto: "Harmonia entre escolhas, ações e resultados." },
  { n: 7, nome: "SUSTENTAÇÃO", texto: "Apoio que fortalece e mantém de pé." },
  {
    n: 8,
    nome: "COMPROMISSO",
    texto: "Dedicação ao que foi construído e ao que ainda vamos construir.",
  },
];

/** A cabeca do metodo, que no site atual vive dentro da mesma captura de tela
 *  do diagrama de cinco etapas e por isso nao e lida por ninguem. */
export const METODO_CABECA = {
  titulo: ["COMO VAMOS", "TRABALHAR"],
  tese: "Gestão presente para ouvir, entender e fazer acontecer",
  principios: [
    "Quem conhece o processo participa da melhoria",
    "Tecnologia para facilitar o trabalho",
    "Responsabilidade para cuidar do presente e do futuro",
  ],
};

/** Os cinco passos, na ordem. Os bullets sao adaptados por publico e vivem
 *  em `publicos.js`: o metodo e o mesmo, os exemplos e que mudam. */
export const ETAPAS = ["PRESENÇA", "ESCUTA", "DIAGNÓSTICO", "DECISÃO", "RESULTADO"];

/** Os tres verbos, na ordem, com a cor fixa que cada um carrega nas quatro
 *  paginas (RE §3: "cor como argumento"). Cor nunca comunica sozinha: cada
 *  bloco tambem tem numero e preenchimento proprios. */
export const VERBOS = [
  { chave: "valorizar", n: 1, verbo: "VALORIZAR", cor: "ambar" },
  { chave: "simplificar", n: 2, verbo: "SIMPLIFICAR", cor: "ceu" },
  { chave: "avancar", n: 3, verbo: "AVANÇAR", cor: "osso" },
];
