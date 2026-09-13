/**
 * Fundo animado do site.
 *
 * Um ambiente só, contínuo, atrás de todas as seções: base em azul profundo,
 * grandes clarões radiais e duas curvas largas atravessando a tela. Nada de
 * bloco de cor por seção — a página inteira acontece sobre esta camada.
 *
 * As formas são desenhadas em SVG, com gradientes que chegam a zero antes da
 * borda de cada caminho. É o que dá o contorno difuso da referência sem
 * precisar de `filter: blur()`, que num elemento do tamanho da viewport
 * custaria caro a cada quadro.
 *
 * Cada camada tem sua própria deriva e seu próprio ritmo de parallax na
 * rolagem, o que cria profundidade e evita a impressão de papel de parede
 * parado. A camada é fixa, fora do fluxo e sem eventos de ponteiro: nada da
 * página muda de posição por causa dela.
 */
export function AnimatedBackground() {
  return (
    <div className="fundo-vivo" aria-hidden>
      <FundoEscuro />
      <FundoClaro />
    </div>
  );
}

/* ---------------------------------------------------------------
   ESCURO — azul profundo com clarões azul e lavanda, e duas curvas
   largas cruzando a tela.
   --------------------------------------------------------------- */
function FundoEscuro() {
  return (
    <svg
      className="fundo-svg fundo-escuro"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <defs>
        {/* Base: o azul não é chapado, vai de marinho a índigo na diagonal */}
        <linearGradient id="jgf-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e1b4d" />
          <stop offset="45%" stopColor="#0a1234" />
          <stop offset="100%" stopColor="#0c1440" />
        </linearGradient>

        {/* Clarão principal, alto à esquerda */}
        <radialGradient id="jgf-clarao-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b74ff" stopOpacity="0.36" />
          <stop offset="45%" stopColor="#2a52d8" stopOpacity="0.17" />
          <stop offset="100%" stopColor="#2a52d8" stopOpacity="0" />
        </radialGradient>

        {/* Lavanda à direita: é ele que tira o azul do tom único */}
        <radialGradient id="jgf-clarao-b" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7d68ff" stopOpacity="0.34" />
          <stop offset="50%" stopColor="#5b4ae0" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#5b4ae0" stopOpacity="0" />
        </radialGradient>

        {/* Azul frio embaixo, para o rodapé não cair no preto */}
        <radialGradient id="jgf-clarao-c" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1f4fd0" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1f4fd0" stopOpacity="0" />
        </radialGradient>

        {/* Curva larga: a cor mora no meio da faixa e some nas duas pontas,
            então o caminho não mostra onde começa nem onde termina. */}
        <linearGradient id="jgf-curva-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6f9dff" stopOpacity="0" />
          <stop offset="42%" stopColor="#6f9dff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6f9dff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="jgf-curva-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8f7bff" stopOpacity="0" />
          <stop offset="50%" stopColor="#8f7bff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8f7bff" stopOpacity="0" />
        </linearGradient>

        {/* Escurecimento das quinas: é ele que segura a leitura do conteúdo */}
        <radialGradient id="jgf-vinheta" cx="50%" cy="45%" r="75%">
          <stop offset="50%" stopColor="#060a1c" stopOpacity="0" />
          <stop offset="100%" stopColor="#050817" stopOpacity="0.82" />
        </radialGradient>
      </defs>

      <rect x="-200" y="-200" width="1840" height="1300" fill="url(#jgf-base)" />

      {/* Camada de trás: os clarões grandes, com a deriva mais lenta */}
      <g className="parallax parallax-fundo">
        <g className="deriva deriva-massa">
          <ellipse cx="210" cy="140" rx="760" ry="600" fill="url(#jgf-clarao-a)" />
          <ellipse cx="700" cy="1010" rx="900" ry="520" fill="url(#jgf-clarao-c)" />
        </g>
      </g>

      {/* Camada do meio: a curva larga que atravessa a tela */}
      <g className="parallax parallax-meio">
        <g className="deriva deriva-rim">
          <path
            d="M-320 700C-40 430 300 250 760 300c380 41 640 250 1000 190v300c-360 60-620-150-1000-190-460-50-800 130-1080 400Z"
            fill="url(#jgf-curva-a)"
          />
        </g>
      </g>

      {/* Camada da frente: lavanda e a segunda curva, as mais rápidas */}
      <g className="parallax parallax-frente">
        <g className="deriva deriva-violeta">
          <ellipse cx="1290" cy="380" rx="620" ry="520" fill="url(#jgf-clarao-b)" />
          <path
            className="curva-interna"
            d="M-260 240C60 70 420 20 820 120c320 80 540 250 880 210v260c-340 40-560-130-880-210-400-100-760-50-1080 120Z"
            fill="url(#jgf-curva-b)"
          />
        </g>
      </g>

      {/* Vinheta parada, por cima de tudo */}
      <rect
        x="-200"
        y="-200"
        width="1840"
        height="1300"
        fill="url(#jgf-vinheta)"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------
   CLARO — mesma linguagem, mesmo desenho, mas lavado: o branco
   continua predominante e as formas só encostam no fundo.
   --------------------------------------------------------------- */
function FundoClaro() {
  return (
    <svg
      className="fundo-svg fundo-claro"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <defs>
        <linearGradient id="jgf-base-claro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3f6ff" />
          <stop offset="50%" stopColor="#fbfcff" />
          <stop offset="100%" stopColor="#f1f5ff" />
        </linearGradient>

        <radialGradient id="jgf-clarao-a-claro" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="jgf-clarao-b-claro" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8f7bff" stopOpacity="0.085" />
          <stop offset="100%" stopColor="#8f7bff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="jgf-clarao-c-claro" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4f9bff" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#4f9bff" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="jgf-curva-a-claro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6f9dff" stopOpacity="0" />
          <stop offset="42%" stopColor="#6f9dff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#6f9dff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="jgf-curva-b-claro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9c8bff" stopOpacity="0" />
          <stop offset="50%" stopColor="#9c8bff" stopOpacity="0.075" />
          <stop offset="100%" stopColor="#9c8bff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x="-200"
        y="-200"
        width="1840"
        height="1300"
        fill="url(#jgf-base-claro)"
      />

      <g className="parallax parallax-fundo">
        <g className="deriva deriva-massa">
          <ellipse
            cx="210"
            cy="140"
            rx="760"
            ry="600"
            fill="url(#jgf-clarao-a-claro)"
          />
          <ellipse
            cx="700"
            cy="1010"
            rx="900"
            ry="520"
            fill="url(#jgf-clarao-c-claro)"
          />
        </g>
      </g>

      <g className="parallax parallax-meio">
        <g className="deriva deriva-rim">
          <path
            d="M-320 700C-40 430 300 250 760 300c380 41 640 250 1000 190v300c-360 60-620-150-1000-190-460-50-800 130-1080 400Z"
            fill="url(#jgf-curva-a-claro)"
          />
        </g>
      </g>

      <g className="parallax parallax-frente">
        <g className="deriva deriva-violeta">
          <ellipse
            cx="1290"
            cy="380"
            rx="620"
            ry="520"
            fill="url(#jgf-clarao-b-claro)"
          />
          <path
            className="curva-interna"
            d="M-260 240C60 70 420 20 820 120c320 80 540 250 880 210v260c-340 40-560-130-880-210-400-100-760-50-1080 120Z"
            fill="url(#jgf-curva-b-claro)"
          />
        </g>
      </g>
    </svg>
  );
}
