/** Copy da home, literal. Ver o cabecalho de `comum.js`. */

/* A capa saiu daqui: ela virou o cartaz de `secoes/Capa.jsx`, onde a quebra
   de linha e a troca de cor no meio da manchete SÃO a composição — hifenizar
   isso num objeto de conteúdo só afastaria o texto de quem o compõe. */

export const PILARES = {
  titulo: "O que significa União e Gestão com Responsabilidade?",
  tese: "Definimos os pilares fundamentais da nossa campanha para uma FURB mais conectada, simples e humana.",
  itens: [
    {
      nome: "UNIÃO",
      texto:
        "Trabalhar juntos mesmo quando pensamos diferente. A união é o encontro de perspectivas diversas para construir um projeto comum e integrar todos os setores da FURB.",
    },
    {
      nome: "GESTÃO",
      texto:
        "Entender antes de decidir. A gestão é o processo de escuta, diagnóstico e acompanhamento para garantir que cada decisão seja fundamentada e eficaz.",
    },
    {
      nome: "RESPONSABILIDADE",
      texto:
        "Cuidar das pessoas, dos recursos e do futuro ao mesmo tempo. A responsabilidade é o compromisso com a sustentabilidade e o desenvolvimento da FURB.",
    },
  ],
};

export const COMPROMISSOS = {
  titulo: "NOSSOS 3 COMPROMISSOS",
  itens: [
    {
      nome: "1. VALORIZAR",
      texto:
        "Reconhecer e desenvolver o talento de quem faz a FURB, criando condições institucionais para que professores, técnicos e estudantes possam desempenhar seus papéis com excelência.",
    },
    {
      nome: "2. SIMPLIFICAR",
      texto:
        "Rever processos e integrar sistemas para facilitar o funcionamento da Universidade, utilizando tecnologia para eliminar redundâncias e melhorar o fluxo de trabalho.",
    },
    {
      nome: "3. AVANÇAR",
      texto:
        "Ampliar possibilidades acadêmicas e tecnológicas, preservando pessoas, recursos e relevância acadêmica para preparar a FURB para o futuro com responsabilidade.",
    },
  ],
};

export const PUBLICOS = [
  {
    rota: "/professores",
    quem: "Professores",
    titulo: "VALORIZAR A MISSÃO ACADÊMICA",
    resumo:
      "Reconhecimento do trabalho em ensino, pesquisa, extensão e gestão, carreira docente e condições para desenvolver a atividade acadêmica.",
    cta: "CONHEÇA NOSSAS PROPOSTAS",
    propostas: 30,
  },
  {
    rota: "/tecnicos",
    quem: "Técnicos",
    titulo: "QUEM FAZ PARTICIPA DA MELHORIA",
    resumo:
      "Reconhecimento, desenvolvimento, integração entre áreas, processos construídos com quem os conhece e tecnologia para facilitar o trabalho.",
    cta: "CONHEÇA NOSSAS PROPOSTAS",
    propostas: 19,
  },
  {
    rota: "/estudantes",
    quem: "Estudantes",
    titulo: "A TUA TRAJETÓRIA IMPORTA",
    resumo:
      "Permanência, acolhimento, assistência e novas possibilidades acadêmicas e de formação.",
    cta: "CONHEÇA NOSSAS PROPOSTAS",
    propostas: 18,
  },
];

export const IDENTIDADE = {
  titulo: ["8 PARTES", "1 PROPÓSITO"],
  paragrafos: [
    "O símbolo da campanha nasce da união de oito triângulos.",
    "Separados, representam diferentes forças e perspectivas.",
    "Juntos, formam um único todo, traduzindo a ideia de uma FURB construída com integração, direção, equilíbrio e responsabilidade.",
    "O símbolo representa diferentes forças que, juntas, constroem uma FURB mais integrada, equilibrada e preparada para avançar.",
  ],
  cta: "QUERO CONVERSAR SOBRE AS PROPOSTAS",
};

export const FECHO = {
  kicker: "o convite",
  linhas: ["Quem faz a FURB", "precisa ser ouvido"],
  cta: "QUERO FALAR COM MARCÃO E CIEL",
};
