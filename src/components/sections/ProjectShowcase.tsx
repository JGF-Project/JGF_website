"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { content } from "@/content";

/** Tempo que cada foto fica visível. */
const AUTO_MS = 5000;

/** Deslocamento lateral da foto que entra e da que sai. */
const DESLIZE_PX = 28;

/** Uma tela de projeto no banner, ou o espaço que a aguarda. */
type Quadro = {
  chave: string;
  projeto: string;
  categoria: string;
  chamada: string;
  /** Âncora do projeto na seção Portfólio. O site externo abre só de lá. */
  ancora: string;
  src: string | null;
};

export function ProjectShowcase() {
  const { portfolio } = content;

  const quadros: Quadro[] = portfolio.projects.flatMap((projeto) =>
    projeto.gallery.map((src, i) => ({
      chave: `${projeto.id}-${i}`,
      projeto: projeto.name,
      categoria: projeto.category,
      chamada: projeto.tagline,
      ancora: `#projeto-${projeto.id}`,
      src,
    })),
  );

  const total = quadros.length;
  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const arrasteRef = useRef<{ x: number } | null>(null);
  /** Marca se o ponteiro arrastou, para o soltar não virar navegação. */
  const arrastouRef = useRef(false);

  /** Cancela o clique quando ele é o fim de um arraste. */
  function aoClicarNoProjeto(e: React.MouseEvent) {
    if (arrastouRef.current) {
      e.preventDefault();
      arrastouRef.current = false;
    }
  }

  const irPara = useCallback(
    (indice: number) => setAtivo(((indice % total) + total) % total),
    [total],
  );

  const andar = useCallback(
    (delta: number) => setAtivo((i) => (((i + delta) % total) + total) % total),
    [total],
  );

  /**
   * Um único disparo agendado por vez, refeito sempre que a foto ativa muda.
   * Navegar na mão reinicia a contagem, e a limpeza cancela o pendente: nunca
   * existem dois timers vivos ao mesmo tempo.
   */
  useEffect(() => {
    if (pausado || total <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = window.setTimeout(() => andar(1), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [ativo, pausado, total, andar]);

  if (total === 0) return null;

  const atual = quadros[ativo];

  /** Distância até a foto ativa, considerando a volta do laço. */
  function distancia(i: number) {
    let d = i - ativo;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  }

  return (
    <div
      // Sem moldura, sem canto arredondado e sem limite de largura: o banner
      // ocupa a tela de ponta a ponta, como no carrossel do Itaú.
      className="relative h-[68vh] max-h-[760px] min-h-[380px] w-full select-none overflow-hidden bg-surface-2"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.buttons !== 1) return;
        arrasteRef.current = { x: e.clientX };
        arrastouRef.current = false;
      }}
      onPointerMove={(e) => {
        const a = arrasteRef.current;
        if (!a) return;
        if (e.pointerType === "mouse" && e.buttons !== 1) {
          arrasteRef.current = null;
          return;
        }
        const delta = e.clientX - a.x;
        if (Math.abs(delta) > 70) {
          arrastouRef.current = true;
          andar(delta > 0 ? -1 : 1);
          a.x = e.clientX;
        }
      }}
      onPointerUp={() => (arrasteRef.current = null)}
      onPointerCancel={() => (arrasteRef.current = null)}
      onPointerLeave={() => (arrasteRef.current = null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") andar(-1);
        if (e.key === "ArrowRight") andar(1);
      }}
      role="group"
      aria-roledescription="carrossel"
      aria-label={portfolio.galleryTitle}
    >
      {/* Camada das imagens */}
      {quadros.map((quadro, i) => {
        const ehAtual = i === ativo;
        const d = distancia(i);

        return (
          <div
            key={quadro.chave}
            aria-hidden={!ehAtual}
            data-quadro
            data-atual={ehAtual}
            style={{
              opacity: ehAtual ? 1 : 0,
              transform: `translateX(${ehAtual ? 0 : d > 0 ? DESLIZE_PX : -DESLIZE_PX}px)`,
            }}
            className={`absolute inset-0 transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              ehAtual ? "" : "pointer-events-none"
            }`}
          >
            {quadro.src ? (
              <>
                {/* Fundo: a mesma imagem preenchendo a área e desfocada, para
                    a faixa lateral não virar uma barra vazia. */}
                <Image
                  src={quadro.src}
                  alt=""
                  aria-hidden
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="scale-110 object-cover object-center blur-2xl"
                />
                {/* Frente: o mockup inteiro, sem corte em nenhuma proporção */}
                <Image
                  src={quadro.src}
                  alt={`Tela do projeto ${quadro.projeto}`}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-contain object-center"
                />
              </>
            ) : (
              <EspacoReservado projeto={quadro.projeto} />
            )}
          </div>
        );
      })}

      {/* Véu que garante a leitura do texto sobre a imagem */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
      />

      {/* A imagem inteira leva ao projeto detalhado, nunca ao site externo */}
      <a
        href={atual.ancora}
        onClick={aoClicarNoProjeto}
        aria-label={`Conhecer o projeto ${atual.projeto}`}
        className="absolute inset-0 z-10"
      />

      {/* Conteúdo sobre a imagem, alinhado à mesma coluna do resto do site.
          A camada não intercepta cliques: só o botão e os indicadores. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-8 sm:pb-10">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
                {atual.categoria}
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                {atual.projeto}
              </h2>
              <p className="mt-2 text-sm text-white/75 sm:text-base">
                {atual.chamada}
              </p>
            </div>

            <a
              href={atual.ancora}
              onClick={aoClicarNoProjeto}
              className="pointer-events-auto inline-flex w-fit shrink-0 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              {portfolio.discoverProject}
            </a>
          </div>

          {/* Indicadores */}
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-1.5">
            {quadros.map((quadro, i) => (
              <button
                key={quadro.chave}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ir para a tela ${i + 1} de ${total}, ${quadro.projeto}`}
                aria-current={i === ativo}
                className={`h-1 rounded-full transition-all duration-400 ${
                  i === ativo ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </Container>
      </div>

      <Seta lado="esquerda" onClick={() => andar(-1)} />
      <Seta lado="direita" onClick={() => andar(1)} />

      <p className="sr-only" aria-live="polite">
        {atual.projeto}, {atual.categoria}
      </p>
    </div>
  );
}

function EspacoReservado({ projeto }: { projeto: string }) {
  const { portfolio } = content;

  return (
    <div className="absolute inset-0 grid place-items-center bg-surface-2">
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="icon-chip h-14 w-14">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2.5" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="m4 17 4.5-4.5a1.8 1.8 0 0 1 2.5 0L20 20" />
          </svg>
        </span>
        <span className="text-sm font-medium text-muted">
          {portfolio.galleryPending}
        </span>
        <span className="text-xs text-muted/70">{projeto}</span>
      </div>
    </div>
  );
}

function Seta({
  lado,
  onClick,
}: {
  lado: "esquerda" | "direita";
  onClick: () => void;
}) {
  const ehEsquerda = lado === "esquerda";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ehEsquerda ? "Tela anterior" : "Próxima tela"}
      className={`absolute top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:h-12 sm:w-12 ${
        ehEsquerda ? "left-4 sm:left-6" : "right-4 sm:right-6"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d={ehEsquerda ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
