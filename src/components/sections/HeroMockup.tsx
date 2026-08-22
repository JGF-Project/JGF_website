"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { content } from "@/content";

/** Tempo de cada projeto na janela. */
const TROCA_MS = 5000;

/** Etiquetas que pairam sobre o mockup, cada uma com seu próprio ritmo. */
const BADGES = [
  { texto: "Projeto publicado", posicao: "-top-3 -left-3 sm:-top-4 sm:-left-6", atraso: "0s" },
  { texto: "100% responsivo", posicao: "-right-3 top-1/3 sm:-right-6", atraso: "1.6s" },
] as const;

export function HeroMockup() {
  const projetos = content.portfolio.projects.filter((p) => p.gallery[0]);
  const total = projetos.length;
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    if (total <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = window.setTimeout(
      () => setAtivo((i) => (i + 1) % total),
      TROCA_MS,
    );
    return () => window.clearTimeout(t);
  }, [ativo, total]);

  if (total === 0) return null;

  const atual = projetos[ativo];

  return (
    <div className="relative">
      {/* Janela de navegador: emoldura a tela do projeto e dá o contexto
          de "isto está no ar", em vez de uma imagem solta. */}
      <div className="janela">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-pill bg-border-forte" />
            <span className="h-2.5 w-2.5 rounded-pill bg-border-forte" />
            <span className="h-2.5 w-2.5 rounded-pill bg-border-forte" />
          </span>
          <span className="ml-2 flex-1 truncate rounded-pill bg-surface px-3 py-1 font-mono text-[0.68rem] text-muted">
            {(atual.href ?? "").replace(/^https?:\/\//, "").replace(/\/.*$/, "")}
          </span>
        </div>

        <div className="relative aspect-[16/10] w-full bg-surface-2">
          {projetos.map((projeto, i) => (
            <Image
              key={projeto.id}
              src={projeto.gallery[0] as string}
              alt={`Tela do projeto ${projeto.name}`}
              fill
              sizes="(max-width: 1024px) 92vw, 620px"
              priority={i === 0}
              className="object-cover object-top transition-opacity duration-700 ease-out"
              style={{ opacity: i === ativo ? 1 : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Etiquetas sobre o mockup */}
      {BADGES.map((badge) => (
        <span
          key={badge.texto}
          aria-hidden
          className={`badge-flutuante flutua absolute ${badge.posicao} hidden sm:inline-flex`}
          style={{ ["--flutua-atraso" as string]: badge.atraso }}
        >
          <span className="h-1.5 w-1.5 rounded-pill bg-brand" />
          {badge.texto}
        </span>
      ))}

      <span
        aria-hidden
        className="badge-flutuante flutua absolute -bottom-4 left-8 hidden text-brand sm:inline-flex"
        style={{ ["--flutua-atraso" as string]: "0.8s" }}
      >
        {atual.name}
      </span>
    </div>
  );
}
