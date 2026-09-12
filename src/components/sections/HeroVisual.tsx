"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
} from "react";
import Image from "next/image";
import { HeroApoio } from "./HeroApoio";
import { content } from "@/content";

/** Tempo que cada projeto fica em cena antes da próxima troca. */
const DURACAO_MS = 5000;

/**
 * Hero de tela cheia.
 *
 * Dois comportamentos independentes convivem aqui, e nenhum interfere no
 * outro:
 *
 * A) o carrossel roda pelo relógio, e o relógio é o próprio anel de progresso
 *    do botão de pausa: a troca acontece no `animationend` dele. Um
 *    `setTimeout` separado dessincronizaria do anel toda vez que a rotação
 *    fosse pausada no meio do caminho;
 * B) a redução roda pela rolagem — um laço de `requestAnimationFrame` escreve
 *    a progressão em `--p` na seção, e largura, altura e canto do quadro saem
 *    dela por `calc()`.
 *
 * O cabeçalho fica fora desta seção, em `page.tsx`. Ele não é ancestral nem
 * descendente do que encolhe, então não escala, não some e não sai do lugar.
 */
export function HeroVisual() {
  const { hero, portfolio } = content;

  // Só entram no rodízio os projetos que já têm arte panorâmica. Assim que a
  // VLM Presentes ganhar a dela, ela volta sozinha, sem mexer aqui.
  const telas = portfolio.projects.flatMap((projeto) =>
    projeto.banner
      ? [
          {
            id: projeto.id,
            banner: projeto.banner,
            alt: `${projeto.name} — ${projeto.category}`,
          },
        ]
      : [],
  );
  const total = telas.length;

  // Os dois índices andam juntos: a figura que sai continua opaca por baixo
  // enquanto a que entra aparece. Guardar a anterior de verdade — em vez de
  // deduzi-la como "a de índice abaixo" — é o que mantém o crossfade correto
  // quando alguém pula direto para um projeto pelos pontos.
  const [quadro, setQuadro] = useState({ ativo: 0, anterior: 0 });
  const { ativo, anterior } = quadro;
  const palcoRef = useRef<HTMLElement>(null);

  // Três motivos independentes para a rotação parar. Só o manual sobrevive a
  // tirar o mouse ou voltar para a aba — é isso que faz a pausa do usuário
  // valer mais que as automáticas.
  const movimentoReduzido = useMovimentoReduzido();
  const abaOculta = useAbaOculta();

  // Enquanto ninguém tocar no botão, quem manda é a preferência do sistema:
  // com movimento reduzido o carrossel abre parado. O primeiro clique passa a
  // decisão para o usuário e ela vale daí em diante.
  const [escolha, setEscolha] = useState<boolean | null>(null);
  const pausadoManual = escolha ?? movimentoReduzido;

  // A pausa por mouse em cima não está aqui: ela é `:hover` puro no CSS, que
  // congela o mesmo anel. Sai mais confiável do que `onMouseEnter`, que o
  // React sintetiza a partir de mouseover/mouseout, e volta sozinha ao sair
  // sem desfazer uma pausa manual.
  const parado = pausadoManual || abaOculta;

  const irPara = (i: number) =>
    setQuadro((q) => (q.ativo === i ? q : { ativo: i, anterior: q.ativo }));

  const andar = (passo: number) =>
    setQuadro((q) => ({
      ativo: (q.ativo + passo + total) % total,
      anterior: q.ativo,
    }));

  function aoTeclar(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;
    evento.preventDefault();
    andar(evento.key === "ArrowRight" ? 1 : -1);
  }

  // --- ANIMAÇÃO B: redução, pela rolagem ---
  useProgressoDeRolagem(palcoRef);

  const { carrossel } = portfolio;
  const rotulado = carrossel.status
    .replace("{atual}", String(ativo + 1))
    .replace("{total}", String(total))
    .replace("{nome}", telas[ativo]?.alt ?? "");

  return (
    <section id="inicio" className="hero-palco" ref={palcoRef}>
      <div className="hero-fixo">
        <div
          className="hero-quadro"
          role="group"
          aria-roledescription="carrossel"
          aria-label={carrossel.rotulo}
          tabIndex={0}
          onKeyDown={aoTeclar}
        >
          <div className="hero-telas">
            {telas.map((tela, i) => (
              <figure
                key={tela.id}
                className="hero-tela"
                data-ativo={i === ativo}
                data-anterior={i === anterior}
              >
                <Image
                  src={tela.banner}
                  alt={tela.alt}
                  fill
                  sizes="100vw"
                  // Só a primeira entra no carregamento crítico. As outras têm
                  // 5 segundos de folga antes de aparecer, tempo de sobra para
                  // chegarem sem disputar banda com a abertura da página.
                  priority={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                  fetchPriority={i === 0 ? "high" : "low"}
                  className="hero-imagem"
                />
              </figure>
            ))}
          </div>

          {/* Véu discreto, mais forte só onde o texto encosta */}
          <div className="hero-veu" aria-hidden />

          {/* Texto fixo: só a imagem atrás dele muda */}
          <div className="hero-legenda">
            <p className="hero-olho">{hero.badge}</p>
            <h1 className="hero-titulo">
              {hero.title}
              {/* Quebra proposital a partir do tablet; no celular o texto flui */}
              <br className="hidden sm:block" /> {hero.titleHighlight}
            </h1>
          </div>

          {/* Quem usa leitor de tela não vê a imagem trocar: esta linha, que
              não aparece na tela, é o que anuncia a troca. */}
          <p className="sr-only" aria-live="polite">
            {rotulado}
          </p>

          {/* Controles discretos. São botões de verdade: conteúdo que troca
              sozinho precisa poder ser controlado por quem navega pelo teclado
              ou quer voltar a uma tela que já passou. */}
          <div className="hero-controles">
            <div className="hero-pontos">
              {telas.map((tela, i) => (
                <button
                  key={tela.id}
                  type="button"
                  className="hero-ponto"
                  data-ativo={i === ativo}
                  aria-current={i === ativo ? "true" : undefined}
                  aria-label={tela.alt}
                  onClick={() => irPara(i)}
                />
              ))}
            </div>

            {total > 1 && (
              <button
                type="button"
                className="hero-pausa"
                aria-pressed={pausadoManual}
                aria-label={
                  pausadoManual ? carrossel.retomar : carrossel.pausar
                }
                onClick={() => setEscolha(!pausadoManual)}
              >
                {/* O anel é o relógio: ele vai de 0 a 100 por cento em
                    DURACAO_MS e, ao terminar, avança o slide. A chave o
                    remonta a cada troca, então o ciclo recomeça do zero. */}
                <span
                  key={ativo}
                  className="hero-anel"
                  data-parado={parado || undefined}
                  style={{ "--duracao": `${DURACAO_MS}ms` } as CSSProperties}
                  onAnimationEnd={() => andar(1)}
                  aria-hidden
                />
                <svg
                  viewBox="0 0 24 24"
                  className="hero-pausa-icone"
                  aria-hidden
                  fill="currentColor"
                >
                  {pausadoManual ? (
                    <path d="M8 5.5v13l11-6.5z" />
                  ) : (
                    <>
                      <rect x="8" y="5.5" width="3" height="13" rx="1" />
                      <rect x="13" y="5.5" width="3" height="13" rx="1" />
                    </>
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Entra à direita conforme o quadro abre espaço. Abaixo de lg fica em
            display none e o mesmo conteúdo vira seção, logo depois do hero. */}
        <div className="hero-texto">
          <HeroApoio compacto />
        </div>
      </div>
    </section>
  );
}

/**
 * Lê uma media query como fonte externa.
 *
 * Assinar direto assim, em vez de copiar o valor para dentro de um estado num
 * efeito, evita a renderização em cascata que o `setState` dentro do efeito
 * provocaria. No servidor a resposta é `false`: não há como saber a
 * preferência de quem ainda não abriu a página.
 */
function useMediaQuery(consulta: string) {
  const assinar = useCallback(
    (aoMudar: () => void) => {
      const mq = window.matchMedia(consulta);
      mq.addEventListener("change", aoMudar);
      return () => mq.removeEventListener("change", aoMudar);
    },
    [consulta],
  );

  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}

function useMovimentoReduzido() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Aba escondida não precisa girar carrossel. */
function useAbaOculta() {
  return useSyncExternalStore(
    (aoMudar) => {
      document.addEventListener("visibilitychange", aoMudar);
      return () => document.removeEventListener("visibilitychange", aoMudar);
    },
    () => document.hidden,
    () => false,
  );
}

/**
 * Liga a posição da rolagem à progressão `--p`, de 0 a 1.
 *
 * O listener de scroll não calcula nada: só acorda o laço de animação. É o
 * laço que lê a posição, e ele relê a cada quadro — nada fica guardado de uma
 * medição antiga, então mudança de altura de tela, barra de endereço do
 * celular ou imagem que terminou de carregar se corrigem sozinhas no quadro
 * seguinte.
 *
 * O valor caminha até o alvo por interpolação, o que tira a aspereza da roda
 * do mouse sem atrasar a resposta de forma perceptível, e o laço para assim
 * que alcança o alvo. Nada disso passa por estado do React: a página não
 * re-renderiza durante a rolagem, só uma propriedade customizada muda.
 */
function useProgressoDeRolagem(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const palco = ref.current;
    const fixo = palco?.firstElementChild as HTMLElement | null;
    if (!palco || !fixo) return;

    let atual = 0;
    let quadro = 0;
    let avancado = false;

    /**
     * A corrida é a distância em que o sticky segura o quadro, medida no DOM
     * em vez de repetida como número mágico. Enquanto ela não existir — layout
     * ainda não aplicado — a progressão é 0: é melhor abrir sem encolhimento e
     * corrigir no quadro seguinte do que abrir com o hero já reduzido.
     */
    const medirAlvo = () => {
      const corrida = palco.offsetHeight - fixo.offsetHeight;
      if (corrida <= 0) return 0;

      const andado = -palco.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, andado / corrida));
    };

    const passo = () => {
      quadro = 0;

      const alvo = medirAlvo();
      // Aproximação por fração: o valor persegue a posição da rolagem em vez
      // de saltar para ela, o que tira a aspereza de cada giro da roda.
      atual += (alvo - atual) * 0.15;

      if (Math.abs(alvo - atual) < 0.0004) {
        atual = alvo;
      } else {
        quadro = requestAnimationFrame(passo);
      }

      palco.style.setProperty("--p", atual.toFixed(4));

      // O texto da direita só fica clicável depois de aparecer. Escrito apenas
      // na virada, não a cada quadro, para não sujar o DOM à toa.
      const agora = atual > 0.6;
      if (agora !== avancado) {
        avancado = agora;
        palco.dataset.avancado = String(agora);
      }
    };

    /**
     * Cancela o quadro pendente e agenda outro, em vez de guardar um sinal de
     * "já estou rodando". Um sinal desses trava para sempre se o quadro
     * agendado nunca chegar a rodar — aba oculta, janela minimizada, navegador
     * estrangulando —, e daí o encolhimento morre e não volta mais. Rolagem
     * dispara no máximo uma vez por quadro, então trocar o agendamento sai
     * praticamente de graça.
     */
    const acordar = () => {
      if (quadro) cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(passo);
    };

    atual = medirAlvo();
    palco.style.setProperty("--p", atual.toFixed(4));

    window.addEventListener("scroll", acordar, { passive: true });
    window.addEventListener("resize", acordar, { passive: true });

    // Acorda o laço quando a própria seção muda de tamanho, o que cobre o
    // primeiro layout e a barra de endereço aparecendo no celular.
    const observador = new ResizeObserver(acordar);
    observador.observe(palco);

    return () => {
      cancelAnimationFrame(quadro);
      observador.disconnect();
      window.removeEventListener("scroll", acordar);
      window.removeEventListener("resize", acordar);
      palco.style.removeProperty("--p");
      delete palco.dataset.avancado;
    };
  }, [ref]);
}
