"use client";

import {
  useCallback,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { content } from "@/content";

/** Tempo que cada projeto fica em cena antes da próxima troca. */
const DURACAO_MS = 5000;

/**
 * Faixa de abertura: um carrossel de imagens de altura fixa.
 *
 * Nada aqui escala, gira ou encolhe. A imagem entra e sai por opacidade e
 * fica parada enquanto está em cena — a faixa tem a mesma altura do começo
 * ao fim, então o conteúdo seguinte começa logo abaixo em vez de exigir uma
 * tela inteira de rolagem.
 *
 * O relógio do carrossel é o próprio anel de progresso do botão de pausa: a
 * troca acontece no `animationend` dele. Um `setTimeout` à parte se
 * dessincronizaria do anel toda vez que a rotação fosse pausada no meio.
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

  const { carrossel } = portfolio;
  const rotulado = carrossel.status
    .replace("{atual}", String(ativo + 1))
    .replace("{total}", String(total))
    .replace("{nome}", telas[ativo]?.alt ?? "");

  return (
    <section
      id="inicio"
      // O recuo de âncora iguala o recuo do topo de `main`, então clicar em
      // "Home" volta ao começo do documento em vez de esconder a faixa atrás
      // do cabeçalho fixo.
      className="hero-faixa scroll-mt-24"
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

      {/* Quem usa leitor de tela não vê a imagem trocar: esta linha, que não
          aparece na tela, é o que anuncia a troca. */}
      <p className="sr-only" aria-live="polite">
        {rotulado}
      </p>

      {/* Controles discretos. São botões de verdade: conteúdo que troca
          sozinho precisa poder ser controlado por quem navega pelo teclado ou
          quer voltar a uma tela que já passou. */}
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
            aria-label={pausadoManual ? carrossel.retomar : carrossel.pausar}
            onClick={() => setEscolha(!pausadoManual)}
          >
            {/* O anel é o relógio: ele vai de 0 a 100 por cento em DURACAO_MS
                e, ao terminar, avança o slide. A chave o remonta a cada troca,
                então o ciclo recomeça do zero. */}
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
