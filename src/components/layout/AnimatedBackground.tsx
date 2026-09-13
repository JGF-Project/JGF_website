/**
 * Fundo do site: azul-marinho profundo com grandes ondulações diagonais.
 *
 * Três camadas, da mais funda para a mais rasa:
 *
 * 1. `.fundo-vivo` — a base. Azul-marinho escuro com clarões radiais, que dão
 *    profundidade e variação de luz sem desenhar nada.
 * 2. `.fundo-ondas` — as faixas. SVG inline, porque uma fita com duas bordas
 *    curvas é um caminho; gradiente não desenha isso. Cada faixa entra e sai
 *    pelas laterais, fora da tela, então nunca se vê onde ela começa.
 * 3. `.fundo-brilho` — clarões difusos que acompanham a rolagem.
 *
 * O `viewBox` fixo com `slice` é o que faz as faixas manterem a mesma curva
 * em qualquer tela: elas são recortadas nas bordas em vez de esticadas, e a
 * diagonal não muda de inclinação entre o desktop e o celular.
 *
 * A camada é fixa, fora do fluxo e sem eventos de ponteiro, e vale para a
 * página inteira — as seções não têm fundo próprio.
 */
export function AnimatedBackground() {
  return (
    <div className="fundo-vivo" aria-hidden>
      <svg
        className="fundo-ondas"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          {/* A cor cede só nos 12 por cento finais de cada ponta, o bastante
              para a faixa não terminar num corte. Antes ela desaparecia por
              quase metade do percurso, e o que sobrava cheio era pouco — parte
              do motivo de a onda não se ler. */}
          <linearGradient id="onda-a" x1="0" y1="0" x2="1" y2="0.45">
            <stop offset="0%" stopColor="var(--onda-1a)" stopOpacity="0.15" />
            <stop offset="12%" stopColor="var(--onda-1a)" stopOpacity="1" />
            <stop offset="88%" stopColor="var(--onda-1b)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--onda-1b)" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="onda-b" x1="0" y1="0" x2="1" y2="0.9">
            <stop offset="0%" stopColor="var(--onda-2a)" stopOpacity="0.15" />
            <stop offset="14%" stopColor="var(--onda-2a)" stopOpacity="1" />
            <stop offset="86%" stopColor="var(--onda-2b)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--onda-2b)" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="onda-c" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="var(--onda-3)" stopOpacity="0.1" />
            <stop offset="20%" stopColor="var(--onda-3)" stopOpacity="0.92" />
            <stop offset="84%" stopColor="var(--onda-3)" stopOpacity="0.86" />
            <stop offset="100%" stopColor="var(--onda-3)" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="onda-d" x1="0" y1="0.2" x2="1" y2="0.8">
            <stop offset="0%" stopColor="var(--onda-4)" stopOpacity="0.12" />
            <stop offset="22%" stopColor="var(--onda-4)" stopOpacity="0.95" />
            <stop offset="82%" stopColor="var(--onda-4)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--onda-4)" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Faixa mais funda: entra pela esquerda, alta, e desce cruzando a
            tela até sair pela direita. */}
        <path
          d="M-260 196C120 62 520 178 880 318c260 101 460 178 820 128v306c-360 46-580-56-840-158-360-141-740-247-1120-113Z"
          fill="url(#onda-a)"
        />

        {/* Faixa maior, na diagonal de cima à esquerda para baixo à direita. */}
        <path
          d="M-260 428C160 250 560 336 920 520c250 128 460 236 780 208v256c-320 30-560-98-820-232-360-186-720-274-1140-90Z"
          fill="url(#onda-b)"
        />

        {/* Camada translúcida mais clara, acompanhando parte das curvas. */}
        <path
          className="onda-clara"
          d="M-260 560C180 352 600 470 960 668c210 116 400 186 740 150v122H-260Z"
          fill="url(#onda-c)"
        />

        {/* Faixa alta e discreta, para o topo não ficar chapado. */}
        <path
          className="onda-alta"
          d="M-260 -60C140 46 520 -18 900 66c260 58 460 118 800 66v168c-340 44-600-30-860-92-380-90-740-26-1100-140Z"
          fill="url(#onda-d)"
        />
      </svg>

      <div className="fundo-brilho" />
    </div>
  );
}
