"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRevelacao } from "./useRevelacao";

/**
 * Variações de entrada. São três porque três bastam: o site inteiro fala a
 * mesma língua de movimento, e cada uma existe por um motivo.
 *
 * - `subir`: o padrão. Sobe e aparece. Serve para blocos e cards.
 * - `surgir`: deslocamento curto, para item de lista e detalhe pequeno, onde
 *   um movimento longo viraria distração ao lado dos vizinhos.
 * - `cortina`: a imagem é descoberta de baixo para cima em vez de aparecer
 *   inteira. `clip-path` anima no compositor, sem custo de layout.
 */
export type RevealVariante = "subir" | "surgir" | "cortina";

/**
 * Revela o conteúdo quando ele entra na tela.
 *
 * A animação mora em `.reveal` no globals.css, que já respeita
 * `prefers-reduced-motion` e degrada para conteúdo visível sem JavaScript.
 * Quando chega a hora é `useRevelacao` quem diz — e é lá também que está a
 * rede que impede o conteúdo de ficar invisível se o observador falhar.
 *
 * Para revelar vários irmãos em sequência, use `Stagger`: ele resolve o mesmo
 * efeito com um observador só, em vez de um por elemento.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variante = "subir",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  variante?: RevealVariante;
}) {
  const { ref, visivel } = useRevelacao(0.12, "0px 0px -60px 0px");

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-visible={visivel}
      data-variante={variante}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
