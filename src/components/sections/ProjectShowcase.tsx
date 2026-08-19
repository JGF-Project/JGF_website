"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  href: string | null;
  src: string | null;
};

export function ProjectShowcase() {
  const { portfolio } = content;

  const quadros: Quadro[] = portfolio.projects.flatMap((projeto) =>
    projeto.gallery.map((src, i) => ({
      chave: `${projeto.id}-${i}`,
      projeto: projeto.name,
      categoria: projeto.category,
      href: projeto.href,
      src,
    })),
  );

  const total = quadros.length;
  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const arrasteRef = useRef<{ x: number } | null>(null);

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
   * Como `ativo` é dependência, navegar na mão reinicia a contagem: toda foto
   * fica os 5 segundos inteiros na tela. A limpeza cancela o disparo pendente,
   * então nunca existem dois timers vivos ao mesmo tempo.
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
      className="relative w-full select-none"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.buttons !== 1) return;
        arrasteRef.current = { x: e.clientX };
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
      {/* Moldura: uma foto por vez, ocupando a largura toda */}
      <div className="edge-glow relative aspect-[4/3] w-full overflow-hidden rounded-card sm:aspect-[16/9] lg:aspect-[21/9]">
        {quadros.map((quadro, i) => {
          const ehAtual = i === ativo;
          const d = distancia(i);

          return (
            <div
              key={quadro.chave}
              aria-hidden={!ehAtual}
              data-quadro
              data-atual={ehAtual}
              // A foto seguinte espera à direita e entra deslizando; a que sai
              // segue para a esquerda. O sentido se inverte ao voltar.
              style={{
                opacity: ehAtual ? 1 : 0,
                transform: `translateX(${ehAtual ? 0 : d > 0 ? DESLIZE_PX : -DESLIZE_PX}px)`,
              }}
              className={`absolute inset-0 transition-[opacity,transform] duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                ehAtual ? "" : "pointer-events-none"
              }`}
            >
              {quadro.src ? (
                <Image
                  src={quadro.src}
                  alt={`Tela do projeto ${quadro.projeto}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1152px"
                  priority={i === 0}
                  className="object-cover object-top"
                />
              ) : (
                <EspacoReservado projeto={quadro.projeto} />
              )}

              {/* Faixa inferior com o nome do projeto */}
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent px-5 pt-16 pb-5 sm:px-8 sm:pb-6">
                <div>
                  <p className="text-base font-semibold text-white sm:text-lg">
                    {quadro.projeto}
                  </p>
                  <p className="text-xs text-white/70 sm:text-sm">
                    {quadro.categoria}
                  </p>
                </div>

                {quadro.href && (
                  <a
                    href={quadro.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={ehAtual ? 0 : -1}
                    className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:text-sm"
                  >
                    {portfolio.viewProject}
                  </a>
                )}
              </div>
            </div>
          );
        })}

        <Seta lado="esquerda" onClick={() => andar(-1)} />
        <Seta lado="direita" onClick={() => andar(1)} />
      </div>

      {/* Indicadores */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        {quadros.map((quadro, i) => (
          <button
            key={quadro.chave}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para a tela ${i + 1} de ${total}, ${quadro.projeto}`}
            aria-current={i === ativo}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === ativo
                ? "w-6 bg-gradient-to-r from-brand to-accent"
                : "w-1.5 bg-border-forte hover:bg-muted"
            }`}
          />
        ))}
      </div>

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
      className={`glass absolute top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center !rounded-full text-foreground transition-colors hover:border-brand hover:text-brand sm:h-11 sm:w-11 ${
        ehEsquerda ? "left-3 sm:left-4" : "right-3 sm:right-4"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d={ehEsquerda ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
