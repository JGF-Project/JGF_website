/**
 * Fundo animado do site.
 *
 * São formas SVG desenhadas, não gradientes soltos: no escuro, uma grande
 * formação luminosa em tigela; no claro, arcos ondulados aninhados com
 * respiro entre eles. Cada camada tem sua própria deriva e seu próprio
 * ritmo de parallax na rolagem, o que cria profundidade.
 *
 * A camada é fixa, fora do fluxo e sem eventos de ponteiro: nada da
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
   ESCURO — uma enorme formação luminosa azulada, de forma irregular,
   com o brilho concentrado numa faixa curva e as bordas cedendo ao
   quase preto.
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
        {/* Massa principal: azul elétrico no núcleo, cedendo nas pontas */}
        <radialGradient id="jgf-massa" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#2c5cf0" stopOpacity="0.72" />
          <stop offset="42%" stopColor="#1e3fb8" stopOpacity="0.42" />
          <stop offset="72%" stopColor="#12235f" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#05090f" stopOpacity="0" />
        </radialGradient>

        {/* A faixa curva que desenha a borda da tigela */}
        <linearGradient id="jgf-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fc3ff" stopOpacity="0.34" />
          <stop offset="46%" stopColor="#5f86e8" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#05090f" stopOpacity="0" />
        </linearGradient>

        {/* Sopro de roxo, discreto, só para o azul não ficar chapado */}
        <radialGradient id="jgf-violeta" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6d5cff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6d5cff" stopOpacity="0" />
        </radialGradient>

        {/* Escurecimento das quinas, que dá a profundidade da referência */}
        <radialGradient id="jgf-vinheta" cx="50%" cy="45%" r="72%">
          <stop offset="55%" stopColor="#05090f" stopOpacity="0" />
          <stop offset="100%" stopColor="#020409" stopOpacity="0.92" />
        </radialGradient>
      </defs>

      {/* Camada de trás: a massa, com a deriva mais lenta de todas */}
      <g className="parallax parallax-fundo">
        <g className="deriva deriva-massa">
          <path
            d="M-380 250C-120 60 260 -70 720 -70s1100 130 1340 320c150 120 190 330 60 520-140 200-520 330-1400 330S-460 1070-560 830c-90-215-40-435 180-580Z"
            fill="url(#jgf-massa)"
          />
        </g>
      </g>

      {/* Camada do meio: a borda curva luminosa, com deriva própria */}
      <g className="parallax parallax-meio">
        <g className="deriva deriva-rim">
          <path
            d="M-260 940C-190 590 60 330 420 250c210-47 430-30 640 40 300 100 500 320 540 650 8 68 8 68-40 68H-220c-48 0-48 0-40-68Z"
            fill="url(#jgf-rim)"
          />
        </g>
      </g>

      {/* Camada da frente: o sopro violeta, o mais rápido dos três */}
      <g className="parallax parallax-frente">
        <g className="deriva deriva-violeta">
          <ellipse cx="1120" cy="230" rx="430" ry="330" fill="url(#jgf-violeta)" />
        </g>
      </g>

      {/* Vinheta parada: é ela que segura a leitura do conteúdo */}
      <rect x="-200" y="-200" width="1840" height="1300" fill="url(#jgf-vinheta)" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   CLARO — arcos ondulados aninhados subindo das bordas, com respiro
   branco entre eles. O branco continua predominante: as formas só
   encostam no fundo, nunca o dominam.
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
        {/* A cor mora na crista e cede para baixo, como na referência */}
        <linearGradient id="jgf-onda-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ec9b7" stopOpacity="0.5" />
          <stop offset="30%" stopColor="#8fdcd0" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#d8f3ee" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="jgf-onda-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#56d7fd" stopOpacity="0.4" />
          <stop offset="34%" stopColor="#9fe6f7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e6f7fb" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="jgf-onda-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fd8c8" stopOpacity="0.46" />
          <stop offset="38%" stopColor="#b6e9e0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Arco externo: o maior, quase saindo pelos lados */}
      <g className="parallax parallax-fundo">
        <g className="deriva deriva-massa">
          <path
            d="M-160 1000C-40 610 190 350 470 322c132-14 176 76 250 76s118-90 250-76c280 28 510 288 630 678Z"
            fill="url(#jgf-onda-a)"
          />
        </g>
      </g>

      {/* Arco do meio */}
      <g className="parallax parallax-meio">
        <g className="deriva deriva-rim">
          <path
            d="M-60 1000C60 700 260 500 540 480c96-7 130 58 180 58s84-65 180-58c280 20 480 220 600 520Z"
            fill="url(#jgf-onda-b)"
          />
        </g>
      </g>

      {/* Arco interno: escondido no celular, onde a tela é estreita */}
      <g className="parallax parallax-frente onda-interna">
        <g className="deriva deriva-violeta">
          <path
            d="M120 1000c110-226 250-370 450-384 70-5 96 44 150 44s80-49 150-44c200 14 340 158 450 384Z"
            fill="url(#jgf-onda-c)"
          />
        </g>
      </g>
    </svg>
  );
}
