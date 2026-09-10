/**
 * As tres paginas internas. Copy literal do site publicado.
 *
 * O esqueleto e o mesmo nas tres, de proposito: verbo constante, complemento
 * adaptado, mesmo metodo com exemplos diferentes. E o que a engenharia
 * reversa chama de "CMS relacional feito a mao" (§4.3) e o motivo de este
 * arquivo ser DADO, e nao tres componentes parecidos.
 */

const PROFESSORES = {
  rota: "/professores",
  quem: "Professores",
  titulo: "Professores",
  descricao:
    "As propostas da Chapa 3 para quem ensina na FURB: carreira docente, reconhecimento de ensino, pesquisa, extensão e gestão, e condições para o trabalho acadêmico.",

  capa: {
    kicker: "quem ensina faz a FURB avançar",
    // Frase de 18 palavras: caixa mista com peso alto, nao caixa alta (RE §2.1).
    manchete:
      "A FURB avança quando o trabalho acadêmico é reconhecido em todas as suas dimensões.",
    linhas: null,
    crus: [
      ["30", "propostas"],
      ["3", "blocos"],
      ["5", "etapas de método"],
    ],
  },

  enquadramento: {
    titulo: "QUEM ENSINA FAZ A FURB AVANÇAR",
    paragrafos: [
      "Ensino médio, graduação e pós-graduação vivem realidades diferentes.",
      "A gestão precisa conhecer essas diferenças para tomar decisões melhores.",
    ],
  },

  blocos: [
    {
      chave: "valorizar",
      verbo: "VALORIZAR",
      complemento: "A MISSÃO ACADÊMICA",
      itens: [
        "Revisar a descrição dos cargos e o dimensionamento do quadro de pessoal conforme as necessidades e o crescimento da Universidade.",
        "Aperfeiçoar os processos de contratação de professores e abertura de concursos para qualificar o planejamento das necessidades docentes.",
        "Integrar DGDP, Departamentos e Centros na identificação e no planejamento das necessidades de pessoal.",
        "Fortalecer as políticas de desenvolvimento, reconhecimento e valorização dos servidores como parte da gestão de pessoas da Universidade.",
        "Oferecer formações específicas aos servidores para desenvolvimento profissional e aperfeiçoamento dos processos de trabalho.",
        "Implantar ações de acolhimento e atenção individualizada como parte de uma cultura institucional de valorização das pessoas.",
        "Revisar o Plano de Carreira Docente para discutir formas de reconhecimento do trabalho realizado na Universidade.",
        "Reconhecer a participação docente em extensão, NDE e atividades de gestão nas formas de progressão e avaliação institucional.",
        "Equilibrar o reconhecimento entre ensino, pesquisa, extensão e gestão considerando as diferentes dimensões do trabalho universitário.",
        "Planejar o quadro docente em conjunto com os Departamentos a partir das necessidades acadêmicas identificadas.",
        "Fortalecer ações de saúde, integração e qualidade de vida dos servidores por meio de iniciativas como COFAFE, Projeto Saúde e atividades de convivência.",
        "Ampliar os espaços de conversa e escuta dos servidores para aproximar a gestão das realidades vividas no trabalho.",
      ],
    },
    {
      chave: "simplificar",
      verbo: "SIMPLIFICAR",
      complemento: "PARA FAZER MELHOR",
      itens: [
        "Mapear os processos administrativos e operacionais para identificar redundâncias, gargalos e etapas que podem ser revistas.",
        "Integrar sistemas e bases de dados institucionais para reduzir dispersão de informações e melhorar a circulação de dados entre áreas.",
        "Revisar os processos relacionados ao Lyceum conforme as novas demandas decorrentes da implantação e evolução do sistema.",
        "Utilizar inteligência artificial em questões operacionais como apoio a tarefas pontuais e à melhoria de processos.",
        "Criar grupos de trabalho entre setores para tratar problemas que atravessam diferentes áreas da Universidade.",
        "Consolidar os sistemas de BI existentes como ferramentas de apoio à tomada de decisão institucional.",
        "Ampliar os painéis de informação para gestores, cursos, departamentos e unidades com indicadores capazes de apoiar o acompanhamento da realidade institucional.",
        "Integrar a CPA ao acompanhamento do PDI para aproximar avaliação institucional, planejamento e monitoramento de resultados.",
        "Aproximar a Gestão Superior das gestões dos Centros por meio de maior integração das informações e dos processos de gestão.",
        "Qualificar o acesso dos gestores às informações com treinamento e acompanhamento para o uso dos dados institucionais.",
      ],
    },
    {
      chave: "avancar",
      verbo: "AVANÇAR",
      complemento: "COM RESPONSABILIDADE",
      itens: [
        "Fortalecer a extensão universitária com política institucional, editais de fomento, reconhecimento na carreira docente e maior integração com graduação, pós-graduação e sociedade.",
        "Ampliar a inovação e a interdisciplinaridade com trilhas de inovação e empreendedorismo e experiências acadêmicas compartilhadas entre diferentes cursos e áreas.",
        "Expandir a internacionalização com intercâmbios, relações com instituições estrangeiras e dimensão internacional nos currículos da FURB.",
        "Valorizar as licenciaturas com política institucional específica, fortalecimento do PIBID, referências do PARFOR e novas possibilidades de formação docente.",
        "Diversificar as trajetórias acadêmicas com dupla ou multidiplomação, percursos formativos flexíveis e certificações ao longo da formação.",
        "Avaliar novos formatos de formação como cursos superiores de tecnologia articulados às áreas de conhecimento já existentes na Universidade.",
        "Respeitar as especificidades de cada área na construção de temas transversais, experiências interdisciplinares e novas possibilidades acadêmicas.",
        "Planejar o futuro acadêmico com sustentabilidade a partir de dados, cenários, relevância acadêmica e social e capacidade institucional.",
      ],
    },
  ],

  reforco: {
    tipo: "nota",
    titulo: "A ETEVI TAMBÉM FAZ PARTE DESTA CONVERSA",
    paragrafos: [
      "O ensino médio tem organização, dinâmica pedagógica e necessidades próprias.",
      "Por isso, não deve ser tratado simplesmente como uma extensão da graduação.",
      "O compromisso é ouvir seus professores, compreender suas particularidades e considerar essa realidade nas decisões que envolvam pessoas, processos e desenvolvimento institucional.",
    ],
  },

  metodo: [
    [
      "Estar próximo de cursos e Departamentos",
      "Conhecer diferentes áreas de formação",
      "Compreender a rotina docente",
      "Reconhecer diferenças entre cursos",
      "Acompanhar demandas acadêmicas",
      "Considerar ensino, pesquisa, extensão e gestão",
    ],
    [
      "Ouvir professores de diferentes áreas",
      "Considerar experiências dos cursos",
      "Identificar demandas recorrentes",
      "Valorizar conhecimento docente",
      "Escutar Departamentos e colegiados",
      "Reconhecer diferentes dimensões do trabalho",
    ],
    [
      "Identificar a origem das dificuldades",
      "Analisar condições de trabalho docente",
      "Compreender necessidades dos cursos",
      "Avaliar impactos dos processos acadêmicos",
      "Considerar diferenças entre áreas",
      "Mapear necessidades do quadro docente",
    ],
    [
      "Utilizar dados e evidências",
      "Considerar a realidade de cada área",
      "Avaliar viabilidade institucional",
      "Respeitar instâncias acadêmicas",
      "Equilibrar pessoas e recursos",
      "Preservar qualidade acadêmica",
      "Definir prioridades com responsabilidade",
    ],
    [
      "Verificar os efeitos das mudanças",
      "Acompanhar indicadores acadêmicos",
      "Avaliar impactos sobre o trabalho docente",
      "Identificar necessidades de ajuste",
      "Observar resultados nos cursos",
      "Acompanhar ensino, pesquisa e extensão",
    ],
  ],

  fecho: {
    kicker: "o convite",
    linhas: ["Quem ensina conhece", "a realidade de quem aprende"],
    paragrafos: [
      "Por isso, ouvir professores faz parte de uma gestão que pretende entender antes de decidir.",
      "Reconhecimento do trabalho em ensino, pesquisa, extensão e gestão, carreira docente e condições para desenvolver a atividade acadêmica.",
      "Participe na construção da nossa campanha.",
      "Sua voz é fundamental para definir o rumo da nossa missão acadêmica e institucional.",
    ],
    cta: "Converse conosco professor(a)",
  },
};

const TECNICOS = {
  rota: "/tecnicos",
  quem: "Técnicos",
  titulo: "Técnicos",
  descricao:
    "As propostas da Chapa 3 para os servidores técnicos da FURB: reconhecimento, integração entre áreas, processos construídos com quem os conhece e tecnologia que facilita o trabalho.",

  capa: {
    kicker: "quem conhece o processo precisa participar da melhoria do processo",
    manchete: null,
    linhas: ["Técnicos fazem", "a FURB acontecer"],
    crus: [
      ["Diferentes", "áreas"],
      ["Diferentes", "conhecimentos"],
      ["Um mesmo", "compromisso com quem faz"],
    ],
    legenda:
      "Da gestão acadêmica à tecnologia, das pessoas às finanças, da pesquisa à extensão, da cultura ao patrimônio: diferentes áreas sustentam diariamente o funcionamento da Universidade",
  },

  enquadramento: {
    titulo: "Quem conhece o trabalho precisa participar da melhoria do trabalho",
    paragrafos: [
      "Não existe uma única realidade técnica dentro da FURB.",
      "Existem diferentes setores, processos, responsabilidades e conhecimentos.",
      "Por isso, uma gestão que pretende melhorar o funcionamento da Universidade precisa ouvir quem conhece cada realidade antes de decidir.",
    ],
  },

  blocos: [
    {
      chave: "valorizar",
      verbo: "VALORIZAR",
      complemento: "QUEM FAZ",
      itens: [
        "Revisar cargos e dimensionamento das equipes de acordo com as necessidades e o desenvolvimento da Universidade.",
        "Fortalecer políticas de desenvolvimento e reconhecimento dos servidores como parte da gestão de pessoas.",
        "Oferecer formação profissional específica relacionada ao desenvolvimento das pessoas e ao aperfeiçoamento dos processos.",
        "Ampliar acolhimento e atenção às pessoas como parte de uma cultura institucional de valorização.",
        "Fortalecer saúde, integração e qualidade de vida por meio de ações institucionais destinadas aos servidores.",
        "Ampliar espaços de conversa e escuta para aproximar decisões das realidades vividas nos setores.",
      ],
    },
    {
      chave: "simplificar",
      verbo: "SIMPLIFICAR",
      complemento: "PARA FAZER MELHOR",
      itens: [
        "Mapear processos administrativos e operacionais para identificar redundâncias e pontos que possam ser aperfeiçoados.",
        "Integrar sistemas e bases de dados institucionais para melhorar a circulação das informações entre áreas.",
        "Revisar processos relacionados ao Lyceum diante das novas demandas decorrentes de sua implantação e evolução.",
        "Utilizar inteligência artificial em questões operacionais e pontuais como ferramenta de apoio ao trabalho.",
        "Criar grupos de trabalho entre setores para questões que atravessam diferentes áreas.",
        "Ampliar o uso de BI e indicadores para apoiar gestores, cursos, departamentos e unidades administrativas.",
      ],
    },
    {
      chave: "avancar",
      verbo: "AVANÇAR",
      complemento: "COM RESPONSABILIDADE",
      itens: [
        "Consolidar a transformação digital como parte da evolução dos processos institucionais.",
        "Ampliar a gestão orientada por dados com BI, indicadores e informações para apoio à decisão.",
        "Qualificar o uso das informações institucionais com acesso, treinamento e acompanhamento dos gestores.",
        "Regularizar a gestão patrimonial com atualização dos registros dos imóveis da Universidade.",
        "Organizar a gestão de resíduos como parte das responsabilidades institucionais de sustentabilidade.",
        "Diversificar as fontes de receita por meio de captação, editais, projetos, parcerias e serviços.",
        "Aperfeiçoar o planejamento financeiro utilizando dados, indicadores e cenários prospectivos.",
      ],
    },
  ],

  reforco: {
    tipo: "saber",
    conhece: [
      "Quem trabalha com registros conhece desafios que não aparecem no organograma.",
      "Quem trabalha com sistemas conhece dependências que nem sempre são visíveis para quem utiliza a ferramenta.",
      "Quem trabalha com pessoas conhece impactos que uma mudança pode produzir nas equipes.",
      "Quem trabalha com materiais, patrimônio e finanças conhece limites e possibilidades necessários para transformar uma ideia em execução.",
      "Quem trabalha com ensino, pesquisa, extensão, pós-graduação e cultura conhece as especificidades das atividades que precisa apoiar.",
    ],
    titulo: "QUEM FAZ, SABE",
    linhas: ["Diferentes setores", "Vários conhecimentos", "Uma FURB"],
    paragrafos: [
      "As necessidades de quem trabalha com ensino, registros acadêmicos, tecnologia, pessoas, pesquisa, extensão, cultura, finanças, materiais ou patrimônio podem ser muito diferentes.",
      "A direção é comum, mas qualquer melhoria precisa considerar a realidade de cada área.",
    ],
    tese: "Não existe “o processo” da FURB. Existem processos que se encontram.",
    depois: [
      "Uma mesma demanda pode atravessar diferentes áreas. Por isso, problemas que atravessam setores precisam de soluções integradas.",
      "Para nós, avançar não é mudar por mudar. É preparar a Universidade para novas demandas sem desperdiçar conhecimento institucional acumulado.",
    ],
  },

  metodo: [
    [
      "Estar próximo dos setores",
      "Conhecer diferentes rotinas",
      "Observar como os processos funcionam",
      "Entender demandas reais",
      "Reconhecer especificidades de cada área",
    ],
    [
      "Ouvir quem executa o trabalho",
      "Considerar experiências das equipes",
      "Identificar dificuldades recorrentes",
      "Valorizar conhecimento institucional",
      "Incluir diferentes áreas na conversa",
    ],
    [
      "Identificar a origem do problema",
      "Separar causa de consequência",
      "Mapear gargalos e redundâncias",
      "Verificar dependências entre setores",
      "Considerar sistemas, pessoas e exigências legais",
    ],
    [
      "Usar informações e evidências",
      "Considerar impactos entre áreas",
      "Avaliar viabilidade e recursos",
      "Respeitar normas e responsabilidades",
      "Definir soluções adequadas ao contexto",
    ],
    [
      "Verificar os efeitos da mudança",
      "Acompanhar indicadores",
      "Identificar novos ajustes",
      "Reduzir retrabalho quando possível",
      "Confirmar se o problema foi resolvido",
    ],
  ],

  fecho: {
    kicker: "o convite",
    linhas: ["Escutar não é uma etapa", "só de comunicação."],
    remate: "É uma etapa de gestão.",
    paragrafos: [
      "Converse com Marcão e Ciel. Sua voz é o motor da nossa gestão.",
      "Participe da construção da FURB que queremos.",
    ],
    cta: "VENHA FALAR COM A GENTE",
  },
};

const ESTUDANTES = {
  rota: "/estudantes",
  quem: "Estudantes",
  titulo: "Estudantes",
  descricao:
    "As propostas da Chapa 3 para quem estuda na FURB: permanência, acolhimento, assistência estudantil e novas possibilidades de formação.",

  capa: {
    kicker: "muitas trajetórias, um mesmo compromisso",
    manchete: null,
    linhas: ["50 cursos diferentes", "muitas trajetórias"],
    remate: "Um mesmo compromisso com quem estuda!",
    crus: [
      ["50", "cursos"],
      ["18", "propostas"],
      ["5", "etapas de método"],
    ],
  },

  enquadramento: {
    titulo: "Cada curso tem sua própria realidade.",
    paragrafos: [
      "Por isso, as decisões precisam considerar as especificidades de cada formação sem perder de vista aquilo que todo estudante precisa para entrar, permanecer, aprender, participar e concluir.",
    ],
    // Erro de revisao do site: "aTENDER" com a primeira letra minuscula (RE §8.5).
    tese: "Atender os estudantes não significa tratar todos como se vivessem a mesma experiência",
    depois: [
      "Um estudante de uma licenciatura pode viver uma trajetória diferente de quem está em uma engenharia, em um curso tecnológico, em uma formação da área da saúde ou em outro campo do conhecimento. Horários, atividades práticas, extensão, estágio, infraestrutura, trajetória curricular e desafios de permanência também podem variar e nós estamos atentos a isto tudo.",
    ],
  },

  blocos: [
    {
      chave: "valorizar",
      verbo: "VALORIZAR",
      complemento: "A TRAJETÓRIA DE QUEM ESTUDA",
      itens: [
        "Estruturar uma política integrada de permanência estudantil para conectar acompanhamento acadêmico e ações institucionais.",
        "Acompanhar a trajetória acadêmica dos estudantes para compreender melhor os diferentes momentos da formação.",
        "Identificar situações de risco de evasão com maior antecedência utilizando informações acadêmicas e institucionais.",
        "Integrar captação e permanência para que a relação com o estudante não termine no ingresso.",
        "Qualificar a gestão de bolsas e auxílios por meio de uma estrutura específica de apoio financeiro.",
        "Articular acolhimento, inclusão, permanência e bem-estar dentro da assistência estudantil.",
        "Considerar diferentes perfis e momentos da trajetória estudantil nas ações de permanência.",
        "Colocar a experiência do estudante entre as referências para as melhorias no campus, como prevê o plano.",
      ],
    },
    {
      chave: "simplificar",
      verbo: "SIMPLIFICAR",
      complemento: "A RELAÇÃO COM A UNIVERSIDADE",
      itens: [
        "Integrar sistemas e informações institucionais para que diferentes áreas tenham melhores condições de compartilhar dados.",
        "Revisar processos acadêmicos e administrativos diante das novas demandas dos sistemas institucionais.",
        "Utilizar dados sobre ingresso, permanência, evasão e conclusão para apoiar decisões relacionadas à experiência estudantil.",
        "Aperfeiçoar a integração entre áreas quando uma demanda estudantil atravessar mais de um setor.",
        "Utilizar tecnologia como facilitadora dos processos sem transformar digitalização em um fim em si mesma.",
      ],
    },
    {
      chave: "avancar",
      verbo: "AVANÇAR",
      complemento: "AS POSSIBILIDADES DE TODA FORMAÇÃO",
      itens: [
        "Consolidar trilhas acessíveis a estudantes de diferentes cursos, e não restritas a uma única área de formação.",
        "Fortalecer intercâmbios, relações com instituições estrangeiras e presença da dimensão internacional também dentro dos currículos da FURB.",
        "Estruturar possibilidades de dupla ou multidiplomação, diferentes percursos formativos e certificações acumuladas ao longo da trajetória acadêmica.",
        "Dinamizar mais integração entre formação acadêmica, projetos de extensão e relação da Universidade com a sociedade.",
        "Estudar e avaliar novas possibilidades acadêmicas articuladas às áreas já existentes e desenvolvimento de trajetórias mais flexíveis.",
      ],
    },
  ],

  reforco: {
    tipo: "cartoes",
    titulo: "O MESMO COMPROMISSO!",
    subtitulo: "Diferentes formas de viver a FURB.",
    paragrafos: [
      "A proposta não é padronizar as experiências.",
      "É ampliar possibilidades respeitando as características de cada formação.",
    ],
    cartoes: [
      {
        nome: "Permanência",
        texto:
          "Acompanhamento da trajetória acadêmica e identificação de situações de risco de evasão para garantir o sucesso integral do estudante.",
      },
      {
        nome: "Assistência",
        texto:
          "Oferecemos suporte integral, bolsas e auxílios financeiros para garantir que todos tenham as condições de se desenvolverem plenamente.",
      },
      {
        nome: "Formação",
        // Concordancia corrigida: o site traz "para que a FURB preparem o futuro" (RE §8.5).
        texto:
          "Criamos novas possibilidades de formação, trilhas de inovação e empreendedorismo para que a FURB prepare o futuro.",
      },
    ],
  },

  metodo: [
    [
      "Estar próximo dos estudantes",
      "Conhecer diferentes cursos e turnos",
      "Observar diferentes momentos da trajetória",
      "Compreender realidades acadêmicas distintas",
      "Identificar dificuldades de permanência",
      "Reconhecer diferentes formas de viver a FURB",
    ],
    [
      "Ouvir estudantes de diferentes áreas",
      "Considerar diferentes perfis e trajetórias",
      "Escutar representações estudantis",
      "Identificar dificuldades recorrentes",
      "Conhecer expectativas sobre a formação",
      "Valorizar a experiência de quem vive a Universidade",
    ],
    [
      "Identificar a origem das dificuldades",
      "Analisar fatores relacionados à evasão",
      "Compreender o que interfere na permanência",
      "Diferenciar demandas do curso, Centro e Reitoria",
      "Integrar informações acadêmicas e institucionais",
      "Reconhecer especificidades de cada formação",
    ],
    [
      "Considerar a realidade de cada curso",
      "Utilizar dados e informações",
      "Avaliar recursos disponíveis",
      "Respeitar responsabilidades institucionais",
      "Integrar áreas quando necessário",
      "Priorizar ações de maior impacto na trajetória",
    ],
    [
      "Verificar efeitos das ações",
      "Acompanhar permanência e conclusão",
      "Avaliar funcionamento dos apoios",
      "Identificar novos ajustes",
      "Observar impactos na trajetória acadêmica",
      "Ouvir novamente os estudantes",
    ],
  ],

  fecho: {
    kicker: "o convite",
    linhas: ["Construindo", "o futuro"],
    paragrafos: [
      "A sua voz é o motor da nossa campanha. Juntos, vamos transformar a FURB em um espaço mais conectado, simples e humana.",
    ],
    cta: "Venha bater um papo com a gente",
  },
};

export const PUBLICOS = {
  "/professores": PROFESSORES,
  "/tecnicos": TECNICOS,
  "/estudantes": ESTUDANTES,
};
