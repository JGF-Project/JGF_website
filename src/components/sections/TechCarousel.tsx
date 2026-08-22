"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { techKindIcons } from "@/components/ui/icons";
import type { TechItem } from "@/content/types";

const TELA_LARGA = "(min-width: 640px)";

/** Distância horizontal entre um card e o vizinho. */
const PASSO = "clamp(150px, 42vw, 260px)";

/** Intervalo do avanço automático, generoso para dar tempo de ler. */
const AUTO_MS = 8000;

/** Arraste mínimo (px) para trocar de card. */
const LIMIAR_ARRASTE = 80;

/** Pausa mínima entre trocas consecutivas: uma de cada vez, sem rajada. */
const INTERVALO_MIN_MS = 450;

/**
 * Intenção de hover: o card só abre depois de o mouse permanecer sobre ele,
 * e só fecha depois de uma pequena tolerância. Evita abre-fecha nervoso
 * em movimentos de passagem.
 */
const ATRASO_ABRIR_MS = 180;
const ATRASO_FECHAR_MS = 260;

function useTelaLarga() {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(TELA_LARGA);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => window.matchMedia(TELA_LARGA).matches,
    () => true,
  );
}

export function TechCarousel({ items }: { items: TechItem[] }) {
  const total = items.length;
  const visiveisPorLado = useTelaLarga() ? 2 : 1;
  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [interagiu, setInteragiu] = useState(false);
  /** id do card aberto (revelando os detalhes); null = todos compactos. */
  const [aberto, setAberto] = useState<string | null>(null);

  const raizRef = useRef<HTMLDivElement>(null);
  const arrasteRef = useRef<{ x: number } | null>(null);
  const ultimaTrocaRef = useRef(0);
  const hoverTimersRef = useRef<{ abrir?: number; fechar?: number }>({});

  const podeTrocar = useCallback(() => {
    const agora = Date.now();
    if (agora - ultimaTrocaRef.current < INTERVALO_MIN_MS) return false;
    ultimaTrocaRef.current = agora;
    return true;
  }, []);

  const irPara = useCallback(
    (indice: number) => setAtivo(((indice % total) + total) % total),
    [total],
  );

  /** Navegar fecha qualquer card aberto: o foco volta para o conjunto. */
  const andar = useCallback(
    (delta: number) => {
      setAberto(null);
      setAtivo((i) => (((i + delta) % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (pausado || interagiu) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = setInterval(() => andar(1), AUTO_MS);
    return () => clearInterval(t);
  }, [pausado, interagiu, andar]);

  // Toque fora do carrossel fecha o card aberto (essencial no celular).
  useEffect(() => {
    function aoTocarFora(e: PointerEvent) {
      if (!raizRef.current?.contains(e.target as Node)) setAberto(null);
    }
    document.addEventListener("pointerdown", aoTocarFora);
    return () => document.removeEventListener("pointerdown", aoTocarFora);
  }, []);

  // Limpa os timers de hover ao desmontar.
  useEffect(() => {
    const timers = hoverTimersRef.current;
    return () => {
      window.clearTimeout(timers.abrir);
      window.clearTimeout(timers.fechar);
    };
  }, []);

  function abrirComIntencao(id: string) {
    window.clearTimeout(hoverTimersRef.current.fechar);
    window.clearTimeout(hoverTimersRef.current.abrir);
    hoverTimersRef.current.abrir = window.setTimeout(
      () => setAberto(id),
      ATRASO_ABRIR_MS,
    );
  }

  function fecharComIntencao(id: string) {
    window.clearTimeout(hoverTimersRef.current.abrir);
    hoverTimersRef.current.fechar = window.setTimeout(
      () => setAberto((atual) => (atual === id ? null : atual)),
      ATRASO_FECHAR_MS,
    );
  }

  function distancia(i: number) {
    let d = i - ativo;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  }

  function aoInteragir() {
    setInteragiu(true);
  }

  const itemAtivo = items[ativo];

  return (
    <div
      ref={raizRef}
      className="relative w-full select-none"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" && podeTrocar()) {
          aoInteragir();
          andar(-1);
        }
        if (e.key === "ArrowRight" && podeTrocar()) {
          aoInteragir();
          andar(1);
        }
        if (e.key === "Escape") setAberto(null);
      }}
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
        if (Math.abs(delta) > LIMIAR_ARRASTE && podeTrocar()) {
          aoInteragir();
          andar(delta > 0 ? -1 : 1);
          a.x = e.clientX;
        }
      }}
      onPointerUp={() => (arrasteRef.current = null)}
      onPointerCancel={() => (arrasteRef.current = null)}
      onPointerLeave={() => (arrasteRef.current = null)}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Tecnologias que a JGF Company usa"
    >
      {/* Palco dos cards */}
      <div className="relative h-[470px] sm:h-[480px]">
        {items.map((item, i) => {
          const d = distancia(i);
          const abs = Math.abs(d);
          const fora = abs > visiveisPorLado;
          const ehAtivo = d === 0;
          const estaAberto = aberto === item.id;

          const escala = ehAtivo ? 1.06 : abs === 1 ? 0.84 : 0.72;
          const opacidade = fora ? 0 : ehAtivo ? 1 : abs === 1 ? 0.45 : 0.18;
          const desl = d - Math.sign(d) * (abs - 1) * 0.18;

          return (
            <TechCard
              key={item.id}
              item={item}
              ehAtivo={ehAtivo}
              fora={fora}
              estaAberto={estaAberto}
              estilo={{
                transform: `translate(-50%, -50%) translateX(calc(${desl} * ${PASSO})) scale(${escala})`,
                opacity: estaAberto ? 1 : opacidade,
                zIndex: estaAberto ? 35 : 30 - abs,
                pointerEvents: fora ? "none" : "auto",
              }}
              aoClicar={() => {
                aoInteragir();
                setAtivo(i);
                // No toque (sem hover), o clique alterna abrir/fechar.
                setAberto((atual) => (atual === item.id ? null : item.id));
              }}
              aoEntrarMouse={() => abrirComIntencao(item.id)}
              aoSairMouse={() => fecharComIntencao(item.id)}
            />
          );
        })}

        <Seta
          lado="esquerda"
          onClick={() => {
            if (!podeTrocar()) return;
            aoInteragir();
            andar(-1);
          }}
        />
        <Seta
          lado="direita"
          onClick={() => {
            if (!podeTrocar()) return;
            aoInteragir();
            andar(1);
          }}
        />
      </div>

      {/* Contador e indicadores */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <p className="font-mono text-xs text-muted" data-contador>
          {String(ativo + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          <span className="mx-2 text-border-forte">·</span>
          <span aria-live="polite">{itemAtivo.category}</span>
        </p>

        <div className="hidden items-center justify-center gap-1.5 sm:flex">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                aoInteragir();
                setAberto(null);
                irPara(i);
              }}
              aria-label={`Ir para ${item.name}`}
              aria-current={i === ativo}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === ativo
                  ? "w-5 bg-brand"
                  : "w-1.5 bg-border-forte hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TechCard({
  item,
  ehAtivo,
  fora,
  estaAberto,
  estilo,
  aoClicar,
  aoEntrarMouse,
  aoSairMouse,
}: {
  item: TechItem;
  ehAtivo: boolean;
  fora: boolean;
  estaAberto: boolean;
  estilo: React.CSSProperties;
  aoClicar: () => void;
  aoEntrarMouse: () => void;
  aoSairMouse: () => void;
}) {
  const Icon = techKindIcons[item.kind];
  const ehBanco = item.kind === "banco";

  return (
    <button
      type="button"
      tabIndex={fora ? -1 : 0}
      aria-hidden={fora}
      aria-current={ehAtivo}
      aria-expanded={estaAberto}
      aria-label={`${item.name}, ${item.category}`}
      onClick={aoClicar}
      onMouseEnter={fora ? undefined : aoEntrarMouse}
      onMouseLeave={aoSairMouse}
      data-tech-card
      data-aberto={estaAberto}
      className={`edge-glow absolute top-1/2 left-1/2 w-[min(86vw,380px)] cursor-pointer overflow-hidden rounded-card text-left transition-[height,transform,opacity,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        estaAberto ? "h-[430px]" : "h-[240px]"
      } ${
        estaAberto || ehAtivo ? "border-border-forte" : ""
      }`}
      style={estilo}
    >
      {/* Face compacta: só ícone e nome, centralizados */}
      <span
        data-face="compacta"
        aria-hidden={estaAberto}
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
          estaAberto ? "opacity-0" : "opacity-100 delay-150"
        }`}
      >
        <span className="icon-chip icon-chip-roxo h-14 w-14">
          <Icon className="h-6 w-6" />
        </span>
        <span className="text-xl font-semibold">{item.name}</span>
      </span>

      {/* Face de detalhes: revelada no hover (ou toque, no celular) */}
      <span
        data-face="detalhe"
        aria-hidden={!estaAberto}
        className={`flex h-full flex-col p-6 transition-[opacity,transform] duration-500 ease-out sm:p-7 ${
          estaAberto
            ? "translate-y-0 opacity-100 delay-150"
            : "translate-y-3 opacity-0"
        }`}
      >
        <span className="flex items-start justify-between gap-3">
          <span className="icon-chip icon-chip-roxo h-12 w-12 shrink-0">
            <Icon className="h-[22px] w-[22px]" />
          </span>
          <span className="tag">{item.category}</span>
        </span>

        <span className="mt-4 block text-2xl font-semibold">{item.name}</span>

        {ehBanco && (
          <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-min border border-accent/40 px-2.5 py-1 text-[0.7rem] font-semibold text-accent">
            Desenvolvimento + Banco de Dados
          </span>
        )}

        <span className="mt-3 block text-sm leading-relaxed text-muted">
          {item.description}
        </span>

        <span className="mt-auto block pt-4">
          <span className="block text-[0.65rem] font-semibold tracking-widest text-muted uppercase">
            Onde usamos
          </span>
          <span className="mt-2.5 flex flex-wrap gap-1.5">
            {item.uses.slice(0, 5).map((uso) => (
              <span key={uso} className="tag">
                {uso}
              </span>
            ))}
          </span>
        </span>
      </span>
    </button>
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
      aria-label={ehEsquerda ? "Tecnologia anterior" : "Próxima tecnologia"}
      className={`glass absolute top-1/2 z-40 grid h-10 w-10 -translate-y-1/2 place-items-center text-muted transition-colors hover:border-brand hover:text-brand sm:h-11 sm:w-11 ${
        ehEsquerda ? "left-0 sm:left-2" : "right-0 sm:right-2"
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
