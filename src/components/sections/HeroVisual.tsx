"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import Image from "next/image";
import { content } from "@/content";

/** Segundos que cada projeto fica em cena antes do crossfade. */
const SEGUNDOS_POR_PROJETO = 4;

/**
 * Hero de tela cheia.
 *
 * A seção é mais alta que a viewport: os primeiros 100svh são o hero em si e
 * o restante é a corrida de rolagem durante a qual ele encolhe, preso pelo
 * `position: sticky`. O encolhimento é uma animação com linha do tempo de
 * rolagem — ela acompanha a posição real do scroll, anda para a frente e para
 * trás junto com o usuário e roda no compositor, sem listener e sem re-render.
 *
 * O cabeçalho fica fora daqui, em `page.tsx`, então nada do que acontece nesta
 * seção o afeta: ele não escala, não some e não sai do lugar.
 */
export function HeroVisual() {
  const { hero, portfolio } = content;
  const projetos = portfolio.projects;
  const quadroRef = useRef<HTMLDivElement>(null);

  useScrollFallback(quadroRef);

  return (
    <section id="inicio" className="hero-palco">
      <div className="hero-fixo">
        <div className="hero-quadro" ref={quadroRef}>
          {/* Carrossel automático: as quatro telas se revezam em crossfade,
              tudo por animação CSS, sem timer em JavaScript para desalinhar. */}
          <div
            className="hero-telas"
            style={
              {
                "--ciclo": `${projetos.length * SEGUNDOS_POR_PROJETO}s`,
              } as CSSProperties
            }
          >
            {projetos.map((projeto, i) => (
              <figure
                key={projeto.id}
                className="hero-tela"
                // O primeiro entra com atraso negativo para já nascer visível,
                // em vez de a página abrir com a tela vazia.
                style={
                  {
                    "--atraso": `${i * SEGUNDOS_POR_PROJETO - 0.8}s`,
                  } as CSSProperties
                }
              >
                <Image
                  src={projeto.banner}
                  alt={`${projeto.name} — ${projeto.category}`}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="hero-imagem"
                />
              </figure>
            ))}
          </div>

          {/* Véu discreto, mais forte só onde o texto encosta */}
          <div className="hero-veu" aria-hidden />

          <div className="hero-legenda">
            <p className="hero-olho">{hero.badge}</p>
            <h1 className="hero-titulo">
              {hero.title}
              {/* Quebra proposital a partir do tablet; no celular o texto flui */}
              <br className="hidden sm:block" /> {hero.titleHighlight}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Reserva para navegadores sem linha do tempo de rolagem em CSS.
 *
 * Onde `animation-timeline` existe, este efeito não faz nada e o CSS resolve
 * tudo sozinho. Onde não existe, um listener passivo apenas marca que houve
 * rolagem e o cálculo acontece dentro de um requestAnimationFrame, escrevendo
 * direto na propriedade customizada do elemento. Nenhum estado do React é
 * tocado, então a página não re-renderiza enquanto o usuário rola.
 */
function useScrollFallback(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof CSS !== "undefined" &&
      CSS.supports?.("animation-timeline: scroll()")
    ) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reserva = "true";

    let pendente = false;

    const aplicar = () => {
      pendente = false;
      const corrida = window.innerHeight * 0.58;
      const p = Math.min(1, Math.max(0, window.scrollY / corrida));
      el.style.setProperty("--p", p.toFixed(4));
    };

    const agendar = () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(aplicar);
    };

    aplicar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });

    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      delete el.dataset.reserva;
      el.style.removeProperty("--p");
    };
  }, [ref]);
}
