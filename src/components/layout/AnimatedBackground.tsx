/**
 * Fundo atmosférico do site.
 *
 * Não há forma desenhada aqui: o ambiente inteiro é gradiente. A base é um
 * degradê em diagonal, do azul profundo ao índigo, e por cima dela alguns
 * clarões radiais — azul médio, azul claro, azul-arroxeado e lilás — que
 * chegam a transparente bem antes de se encontrarem. É isso que evita
 * qualquer borda, faixa ou divisão visível entre as camadas.
 *
 * A composição toda mora no CSS, em `.fundo-vivo` e `.fundo-brilho`: este
 * componente só existe para pôr os dois elementos na página, uma vez, na raiz
 * do layout. Por isso a página inteira acontece sobre o mesmo ambiente — as
 * seções não têm fundo próprio.
 *
 * A camada é fixa, fora do fluxo e sem eventos de ponteiro: nada da página
 * muda de posição por causa dela.
 */
export function AnimatedBackground() {
  return (
    <div className="fundo-vivo" aria-hidden>
      <div className="fundo-brilho" />
    </div>
  );
}
