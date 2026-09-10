# Chapa 3 · Marcão + Ciel · Reitoria FURB

Reestruturação do site publicado em
`chapa3marcaoeciel.wixsite.com/chapa3-marcaoeciel`.

**Toda a copy do site atual está aqui**, verbatim — 114 trechos conferidos por
script contra a extração da fonte, incluindo as 67 propostas (30 professores,
19 técnicos, 18 estudantes) e os 86 itens do método nas três páginas. A
arquitetura de informação também: navegação por público, verbo constante com
complemento adaptado, e o mesmo método de cinco etapas com exemplos diferentes
em cada página. Essas três decisões são o que a engenharia reversa chama de
maior acerto do site de origem, e nenhuma foi tocada.

O que mudou é a **execução**: a embalagem, o movimento, a acessibilidade e os
metadados.

## Rodar

```bash
npm install
npm run dev                    # http://localhost:5173
npm run build                  # dist/ com as quatro páginas prontas
npm run preview                # serve o build
npm run verificar              # confere o build servido (ver abaixo)
```

`npm run build` gera HTML estático completo para as quatro rotas. Não precisa
de Node em produção: qualquer hospedagem de arquivos serve (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, um bucket, um Apache).

## Antes de publicar

Três campos em `src/config.js` travam a publicação e **nenhum deles pode ser
inventado**:

| Campo | O que é | Por que trava |
| --- | --- | --- |
| `site` | o endereço final, sem barra no fim | sem ele o `og:image` sai relativo, e cartão social relativo não é buscado pelo WhatsApp nem pelo Twitter. O build avisa. |
| `contato.email` | **um** e-mail | o site atual alterna dois endereços diferentes, e o domínio de um deles tem um "s" a mais em "ciel". Enquanto ninguém confirmar que aquela caixa recebe, o único endereço aqui é o Gmail. |
| `eleicao.data` | data e link de votação | a informação mais prática que falta no site atual. A faixa fixa está pronta e só aparece quando o campo for preenchido. |

## O que foi corrigido, e por quê

Cada item abaixo sai de um achado da engenharia reversa em
`../detalhes/Engenharia reversa Chapa 3 Marcão Ciel (Wix).md`.

**Compartilhamento (Nota metodológica 1).** O site atual não tem `og:image`
nem `twitter:image` em nenhuma das quatro páginas, embora declare
`twitter:card: summary_large_image`. Um site de campanha é compartilhado antes
de ser buscado, e o preview do link *é* a peça publicitária. Aqui cada rota tem
`<title>`, `meta description`, `og:*` e `twitter:*` próprios, e a imagem de
1200×630 sai da arte da própria campanha.

**Um e-mail só (Nota metodológica 2).** Ver a tabela acima.

**O diagrama de cinco etapas deixou de ser imagem (Nota metodológica 3 e §5.3).**
No original, PRESENÇA → ESCUTA → DIAGNÓSTICO → DECISÃO → RESULTADO é uma
captura de tela de 980×351 com trinta bullets rasterizados dentro, a mesma nas
três páginas — ilegível em 390px e invisível para leitor de tela. Aqui é texto,
numa régua que acende a etapa em leitura e cujos rótulos são âncoras.

**Os oito triângulos idem.** O painel de identidade também era captura de tela.
Agora o símbolo é SVG e cada uma das oito partes acende junto com a sua
definição escrita, conforme a página desce — "separados, representam diferentes
forças; juntos, formam um único todo" dito pela peça, não sobre ela.

**Hierarquia de títulos (§2.1 e §5.3).** Um `h1` por página, sem salto de
nível, sem heading vazio de espaçamento, sem parágrafo marcado como título. O
`npm run verificar` mede isso nas quatro páginas.

**Caixa alta só até ~6 palavras (§2.1).** As frases longas — "A FURB avança
quando o trabalho acadêmico…", "Não existe 'o processo' da FURB…" — passaram a
caixa mista com peso alto. Caixa alta em frase longa elimina a silhueta das
palavras e custa velocidade de leitura de verdade.

**Corpo de 17–18px, entrelinha 1,65, medida de 65 caracteres (§2.2).** "Se há
uma única mudança tipográfica a fazer, é esta", diz o documento, porque o site
é essencialmente uma coleção de listas longas.

**Cor como argumento (§3).** VALORIZAR carrega âmbar, SIMPLIFICAR carrega céu,
AVANÇAR carrega osso — as mesmas cores nas quatro páginas. Cor nunca comunica
sozinha: cada bloco também tem número e preenchimento próprios.

**Nada de terceiro no topo (§4.1).** A faixa de anúncio do Wix era o primeiro
elemento clicável de todas as páginas.

**Estado ativo na navegação (§5.2)** e **os três cards de público parecem
clicáveis** — fio que acende, símbolo que gira, CTA que muda de cor.

**O link circular (§4.3).** Na página de Estudantes o CTA "CONHEÇA NOSSAS
PROPOSTAS" apontava de volta para a home, com as propostas logo abaixo. Agora
aponta para `#propostas`.

**Voltar ao topo e âncoras internas (§5.1).** Obrigatórios em páginas de trinta
propostas.

**Dois erros de revisão (§8, nível 1).** `aTENDER` → `Atender`, e "para que a
FURB **preparem** o futuro" → "prepare". São as duas únicas alterações de texto
em todo o conteúdo, e cada uma está anotada no arquivo de conteúdo.

**O que não foi feito, e por quê.** As listas longas **não** colapsam em
acordeão, apesar de o §5.1 sugerir. Proposta escondida em site de campanha é
proposta não lida, e a regra do catálogo de layouts é explícita: conteúdo nunca
fica preso invisível. O que resolve a mesma dor sem esconder nada é a barra de
atalhos grudada, com a contagem de propostas de cada bloco.

## Estrutura

```
src/
  config.js            o que muda sem tocar em componente
  App.jsx              quatro rotas, quatro arquivos HTML, nenhum roteador
  conteudo/            TODA a copy, como dado
    comum.js           navegação, os 8 triângulos, as 5 etapas, os 3 verbos
    home.js
    publicos.js        professores · técnicos · estudantes
  paginas/             Home.jsx · Publico.jsx (um molde, três conjuntos)
  secoes/              uma seção por arquivo
  components/          botão, painel, marquise, símbolo, cabeçalho, rodapé…
  motion/              Lenis na rolagem, anime.js nas revelações
  styles/              tokens/ + base + página
scripts/
  prerender.mjs        escreve as quatro páginas com metadados próprios
  check-size.mjs       teto de 120 KB de JS e 130 KB de fonte
  verificar.mjs        acessibilidade, contraste, sem-JS, 390px
```

Roteamento é `<a href>` comum: o build escreve `index.html`,
`professores.html` + `professores/index.html`, e assim por diante. Duas
convenções porque hospedagem estática resolve `/professores` ora por uma, ora
por outra, e nenhuma é universal.

## Sistema de design

Vem de `../detalhes/layouts-globais/` (31 layouts) e da implementação de
referência em `~/Documentos/fluor-landing` — React 19, Vite, anime.js, Lenis,
duas famílias auto-hospedadas (Big Shoulders Display assina, IBM Plex Sans
explica). As cinco regras que atravessam tudo:

1. `overflow: clip`, nunca `hidden`, em ancestral de algo grudado.
2. Quem gruda nunca é quem mede.
3. `100svh`, nunca `100vh`.
4. Cor nunca comunica sozinha.
5. Conteúdo nunca fica preso invisível.

A paleta saiu do símbolo da campanha, porque a engenharia reversa não conseguiu
verificar cor nenhuma no site publicado — o Wix injeta o CSS em execução — e
mandava lê-la ali: azul institucional, âmbar (sete triângulos) e o azul-céu do
oitavo.

## Orçamento

| | medido | teto |
| --- | --- | --- |
| JavaScript comprimido | 105,9 KB | 120 KB |
| CSS comprimido | 7,5 KB | — |
| Fontes | 79,2 KB | 130 KB |

Importa porque o link vai circular por WhatsApp, em 4G, no meio de uma reunião
de departamento.
