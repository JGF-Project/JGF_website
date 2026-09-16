"use client";

import type { CSSProperties, ReactNode } from "react";
import type { RevealVariante } from "./Reveal";
import { useRevelacao } from "./useRevelacao";

/**
 * Revela os filhos diretos em cascata quando o bloco entra na tela.
 *
 * Um observador só, no contêiner — não um por cartão. O atraso de cada filho
 * sai do `nth-child` em `.sequencia` (globals.css), então nenhuma seção
 * precisa calcular `delay={i * 100}` à mão nem passar índice adiante.
 *
 * Os filhos entram como estão: a classe é aplicada pelo seletor de
 * descendência, sem clonar elemento nem exigir que aceitem `style`. Por isso
 * o contêiner tem de ser o pai direto — um `<div>` no meio do caminho
 * interrompe a cascata.
 *
 * `passo` é o intervalo entre um filho e o seguinte. O padrão de 90ms é curto
 * o bastante para a fileira inteira terminar antes de o visitante passar
 * dela, e longo o bastante para a ordem se ler.
 */
export function Stagger({
  children,
  className = "",
  as: Tag = "div",
  variante = "subir",
  passo = 90,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section" | "dl";
  variante?: RevealVariante;
  passo?: number;
}) {
  // Limiar baixo: numa fileira alta, esperar 12% do bloco todo faria a
  // cascata só começar quando os primeiros cartões já passaram da dobra.
  const { ref, visivel } = useRevelacao(0.05, "0px 0px -80px 0px");

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-visible={visivel}
      data-variante={variante}
      style={{ "--passo": `${passo}ms` } as CSSProperties}
      className={`sequencia ${className}`}
    >
      {children}
    </Tag>
  );
}
