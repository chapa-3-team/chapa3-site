/**
 * Tudo o que muda sem tocar em componente vive aqui.
 *
 * Os campos `null` sao os buracos que a engenharia reversa apontou e que NAO
 * podem ser preenchidos por inferencia. Quando o dado chegar, ele entra aqui e
 * a peca correspondente aparece sozinha; enquanto for `null`, ela nao existe.
 * Inventar data de eleicao num site de campanha e pior que nao ter.
 */
export const config = {
  /**
   * O endereço final do site, SEM barra no fim.
   *
   * Preencher antes de publicar. É daqui que saem as URLs absolutas de
   * `canonical`, `og:url` e `og:image`, e cartão social com caminho relativo
   * não é buscado por WhatsApp, Telegram nem Twitter — o que devolveria o
   * retângulo cinza que a engenharia reversa aponta como a falha mais cara do
   * site publicado. `scripts/prerender.mjs` avisa enquanto isto estiver vazio.
   *
   * A engenharia reversa §8 nível 3 recomenda domínio próprio e curto: o
   * endereço atual tem 54 caracteres e o nome da chapa repetido duas vezes.
   */
  site: "",

  chapa: "3",
  nomes: "Marcão + Ciel",
  mote: "União e Gestão com Responsabilidade",
  sintese: "Uma FURB mais conectada, simples e humana.",

  /**
   * UM e-mail no site inteiro (Nota metodologica 2 da engenharia reversa).
   *
   * O site atual alterna `contato@marcao-ciels.com.br` (cabecalho e CTAs das
   * paginas internas) com `chapa3.marcaoeciel@gmail.com` (rodape e CTAs da
   * home) - duas caixas diferentes, e o dominio do primeiro tem um "s" a mais
   * em "ciel". Ate alguem confirmar que aquele dominio existe e recebe, o
   * endereco verificavel e o Gmail, e ele e o unico que aparece.
   */
  contato: {
    email: "chapa3.marcaoeciel@gmail.com",
    // Preencher SO depois de enviar uma mensagem de teste e ver ela chegar.
    emailInstitucional: null, // "contato@marcao-ciel.com.br"
    whatsapp: null, // "5547900000000" - RE §6.2: mailto falha calado no celular
  },

  /**
   * A informacao mais pratica que falta no site atual (RE §4.2).
   * Com `data` preenchida, a barra fixa de eleicao aparece em todas as paginas.
   */
  eleicao: {
    data: null, // "2026-10-15"
    dataLegivel: null, // "15 de outubro"
    comoVotar: null, // URL do sistema de votacao
  },

  copyright: "© 2026 Marcão + Ciel. Reitoria FURB. Todos os direitos reservados.",
};

/** O verbo do botao principal, um so por pagina. */
export const CTA_PADRAO = "Converse com a gente";

export function mailto(assunto) {
  const alvo = `mailto:${config.contato.email}`;
  return assunto ? `${alvo}?subject=${encodeURIComponent(assunto)}` : alvo;
}
