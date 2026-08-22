/**
 * Fundo animado do site: uma camada fixa atrás de todo o conteúdo.
 *
 * Não ocupa espaço no layout e não recebe cliques, então nada da página
 * muda de posição por causa dela. Toda a animação vive no CSS
 * (`.fundo-vivo` em globals.css), usando só transform.
 */
export function BackgroundAmbience() {
  return (
    <div className="fundo-vivo" aria-hidden>
      <span className="onda onda-1" />
      <span className="onda onda-2" />
      <span className="onda onda-3" />
    </div>
  );
}
