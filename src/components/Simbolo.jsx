/**
 * O símbolo da campanha: oito triângulos, um deles em céu.
 *
 * No site publicado ele é uma CAPTURA DE TELA (`Captura de tela 2026-08-26
 * 153926.png`, Nota metodológica 3 da engenharia reversa): texto rasterizado,
 * travado em 980px, sem transparência, borrado em tela retina e impossível de
 * animar. Aqui é geometria: oito caminhos calculados em torno de um centro,
 * `currentColor` quando precisa herdar o tema, e cada triângulo endereçável
 * um a um — que é o que permite a seção "8 PARTES 1 PROPÓSITO" acender parte
 * por parte em vez de mostrar um retrato do símbolo.
 *
 * Ápice para dentro, base para fora, 18° de meio-ângulo, oito setores de 45°.
 * Os números saíram de medir o PNG original: raio externo/interno de 92/42 num
 * quadro de 200, que reproduz a proporção do arquivo da campanha.
 */
export const TRIANGULOS_D = [
  "M71.6 12.5L128.4 12.5L100.0 58.0Z",
  "M141.8 18.0L182.0 58.2L129.7 70.3Z",
  "M187.5 71.6L187.5 128.4L142.0 100.0Z",
  "M182.0 141.8L141.8 182.0L129.7 129.7Z",
  "M128.4 187.5L71.6 187.5L100.0 142.0Z",
  "M58.2 182.0L18.0 141.8L70.3 129.7Z",
  "M12.5 128.4L12.5 71.6L58.0 100.0Z",
  "M18.0 58.2L58.2 18.0L70.3 70.3Z",
];

/**
 * `cor` = "marca" pinta com o âmbar e o céu da identidade; "atual" pinta tudo
 * em `currentColor`, para o símbolo funcionar como glifo dentro de texto e
 * dentro da faixa de acento do rodapé.
 */
export function Simbolo({ className = "simbolo", cor = "marca", titulo }) {
  return (
    <svg
      className={`${className} simbolo--${cor}`}
      viewBox="0 0 200 200"
      role={titulo ? "img" : "presentation"}
      aria-hidden={titulo ? undefined : "true"}
      aria-label={titulo}
    >
      {TRIANGULOS_D.map((d, i) => (
        <path
          key={d}
          className={`simbolo__parte${i === 0 ? " simbolo__parte--ceu" : ""}`}
          data-parte={i}
          d={d}
        />
      ))}
    </svg>
  );
}
