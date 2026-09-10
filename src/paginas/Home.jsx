import { Botao } from "../components/Botao.jsx";
import { Painel } from "../components/Painel.jsx";
import { Capa } from "../secoes/Capa.jsx";
import { Compromissos } from "../secoes/Compromissos.jsx";
import { Identidade } from "../secoes/Identidade.jsx";
import { Pilares } from "../secoes/Pilares.jsx";
import { Publicos } from "../secoes/Publicos.jsx";
import { FECHO } from "../conteudo/home.js";

/**
 * A home, na mesma cadência do site publicado — que é o maior acerto dele:
 * valores → compromissos → segmentação por público → identidade → convite.
 * Sem gordura. A engenharia reversa §8 manda preservar essa ordem, e ela
 * está preservada.
 *
 * O que muda é a FORMA de cada bloco, e a alternância de tema: Sigilo (azul
 * institucional) e Cartaz (papel) se revezam, com a troca no limite da seção,
 * em corte. É o ritmo que substitui as três origens de imagem que não
 * conversavam entre si (§4.4).
 *
 * A abertura é o cartaz da campanha composto em código (`secoes/Capa.jsx`), e
 * não o painel tipográfico genérico: a primeira tela é a única que precisa
 * ser reconhecível como a arte que já circula fora do site.
 */
export const SECOES_HOME = [
  "inicio",
  "pilares",
  "compromissos",
  "publicos",
  "identidade",
  "fechamento",
];

export function Home() {
  return (
    <>
      <Capa />

      <Pilares />

      <Compromissos />
      <Publicos />
      <Identidade />

      <Painel
        id="fechamento"
        className="painel--fechamento painel--fechamento-home"
        kicker={FECHO.kicker}
        linhas={FECHO.linhas}
        naRolagem
        acao={
          <>
            <Botao rotulo={FECHO.cta} assunto="Quero falar com Marcão e Ciel" />
            <span className="microregistro mono-reg">
              Uma FURB mais conectada, simples e humana.
            </span>
          </>
        }
      />
    </>
  );
}
