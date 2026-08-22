type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function MailIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.2 5.6a1.5 1.5 0 0 0 1.6 0L21 7" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M19 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function CopyIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H5.5A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
    </svg>
  );
}

export function PlusIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* Ícones dos serviços */

export function GlobeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

export function RocketIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13.5 3.5c3.6.4 6.6 3.4 7 7-2.3 4.6-6 7.4-9.6 8.2l-2.6-2.6c.8-3.6 3.6-7.3 8.2-9.6" />
      <path d="M8.3 16.2 5.5 13.4M6.5 17.5c-1 1-1.3 3.5-1.3 3.5s2.5-.3 3.5-1.3" />
      <circle cx="14.8" cy="9.2" r="1.6" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="m9.5 15 1.8 1.8 3.4-3.6" />
    </svg>
  );
}

export function MobileIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
    </svg>
  );
}

export function ChartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M8 16v-3M12 16v-6M16 16v-4" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   Ícones dos serviços, desenhados a partir das artes enviadas pela
   equipe. São preenchidos (não de traço) e simplificados de propósito:
   dentro do chip eles aparecem a 24px, e detalhe fino vira borrão.
   --------------------------------------------------------------- */

/** Reunião de apresentação: base do ícone de Sites institucionais. */
export function ReuniaoIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Quem apresenta: cabeça, tronco e o braço levantado */}
      <circle cx="12" cy="3.5" r="2.3" />
      <path d="M8.7 12.8V9.3a3.3 3.3 0 0 1 6.6 0v3.5Z" />
      <path d="M9 9.9 6.6 7.6a1.35 1.35 0 0 0-1.9 1.9l2.8 2.7 1.5-2.3Z" />

      {/* Quem assiste, nas laterais */}
      <circle cx="4.1" cy="9.4" r="1.75" />
      <circle cx="19.9" cy="9.4" r="1.75" />

      {/* Mesa */}
      <path d="M6.7 13.6h10.6l4.5 5.6H2.2Z" />
      <path d="M2 20.1h20v1.4H2Z" />

      {/* Quem está de costas, em primeiro plano */}
      <circle cx="12" cy="16.6" r="2.2" />
      <path d="M12 19.3a3.6 3.6 0 0 1 3.6 3.6H8.4A3.6 3.6 0 0 1 12 19.3Z" />
    </svg>
  );
}

/** Página de navegador com faixa, texto e cards: base de Landing pages. */
export function PaginaIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Janela e a barra do topo com os três pontos */}
      <path d="M4 3.2h16a1.6 1.6 0 0 1 1.6 1.6v13.4A1.6 1.6 0 0 1 20 19.8H4a1.6 1.6 0 0 1-1.6-1.6V4.8A1.6 1.6 0 0 1 4 3.2Zm0 1.5a.3.3 0 0 0-.3.3v1.7h16.6V5a.3.3 0 0 0-.3-.3Z" />
      <circle cx="5.4" cy="5.8" r=".62" />
      <circle cx="7.5" cy="5.8" r=".62" />
      <circle cx="9.6" cy="5.8" r=".62" />

      {/* Faixa de destaque no topo do conteúdo */}
      <path d="M4.6 8.1h14.8v2.7H4.6Z" />

      {/* Bloco de texto ao lado de uma marca redonda */}
      <circle cx="6.2" cy="13.2" r="1.35" />
      <path d="M9.1 12.1h10.3v.95H9.1Zm0 2.1h8.2v.95H9.1Z" />

      {/* Três cards na base */}
      <path d="M4.6 16.4h4.1v2.3H4.6Zm5.35 0h4.1v2.3h-4.1Zm5.35 0h4.1v2.3h-4.1Z" />
    </svg>
  );
}

/** Calendário com espiral e visto: base de Sistemas de agendamento. */
export function AgendaIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Espiral do topo */}
      <path d="M6.2 1.6a.95.95 0 0 1 .95.95v2.6a.95.95 0 1 1-1.9 0v-2.6a.95.95 0 0 1 .95-.95Zm3.6 0a.95.95 0 0 1 .95.95v2.6a.95.95 0 1 1-1.9 0v-2.6a.95.95 0 0 1 .95-.95Zm3.6 0a.95.95 0 0 1 .95.95v2.6a.95.95 0 1 1-1.9 0v-2.6a.95.95 0 0 1 .95-.95Zm3.6 0a.95.95 0 0 1 .95.95v2.6a.95.95 0 1 1-1.9 0v-2.6a.95.95 0 0 1 .95-.95Z" />

      {/* Corpo do calendário, com a folha branca vazada */}
      <path d="M4.4 3.4h15.2a2 2 0 0 1 2 2v13.4a2 2 0 0 1-2 2H4.4a2 2 0 0 1-2-2V5.4a2 2 0 0 1 2-2Zm-.3 6.1v9.1a.6.6 0 0 0 .6.6h14.6a.6.6 0 0 0 .6-.6V9.5Z" />

      {/* Dias */}
      <path d="M5.9 11.1h2.7v2.1H5.9Zm4.2 0h2.7v2.1h-2.7Zm4.2 0h2.7v2.1h-2.7ZM5.9 14.5h2.7v2.1H5.9Zm4.2 0h2.7v2.1h-2.7Z" />

      {/* Visto de confirmação */}
      <path d="M15 17.4a.9.9 0 0 1 0-1.3l.9-.9a.9.9 0 0 1 1.3 0l1.1 1.1 3.1-3.2a.9.9 0 0 1 1.3 0l.9.9a.9.9 0 0 1 0 1.3l-4.6 4.7a.9.9 0 0 1-1.3 0Z" />
    </svg>
  );
}

/** Painel com cards de rosca, barras e linha: base de Dashboards. */
export function PainelIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      {/* Painel central, com a coluna lateral e as linhas de conteúdo */}
      <path d="M7.4 4.2h7.9a1.3 1.3 0 0 1 1.3 1.3v13a1.3 1.3 0 0 1-1.3 1.3H7.4a1.3 1.3 0 0 1-1.3-1.3v-13a1.3 1.3 0 0 1 1.3-1.3Zm.4 2.5h1.9v1H7.8Zm0 2.4h1.9v1H7.8Zm0 2.4h1.9v1H7.8Zm3.5-4.8h4v1h-4Zm0 2.4h4v1h-4Zm0 2.4h4v1h-4Zm0 2.4h4v1h-4Z" />

      {/* Card de rosca, no alto à direita */}
      <path d="M17.6 2.6h4.1a1 1 0 0 1 1 1v4.1a1 1 0 0 1-1 1h-4.1a1 1 0 0 1-1-1V3.6a1 1 0 0 1 1-1Zm2.05 1.7a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7Zm0 1.25a.6.6 0 1 1 0 1.2.6.6 0 0 1 0-1.2Z" />

      {/* Card de barras, embaixo à direita */}
      <path d="M17.6 12.4h4.1a1 1 0 0 1 1 1v4.1a1 1 0 0 1-1 1h-4.1a1 1 0 0 1-1-1v-4.1a1 1 0 0 1 1-1Zm.55 3.05h.85v2.05h-.85Zm1.5-1.5h.85v3.55h-.85Zm1.5 1h.85v2.55h-.85Z" />

      {/* Card de linha, à esquerda */}
      <path d="M1.3 10.9h4.1a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H1.3a1 1 0 0 1-1-1v-4.1a1 1 0 0 1 1-1Zm.5 4.2.75-1.4 1 .75 1.05-1.75.7.42-1.4 2.35-1-.75-.5.95Z" />
    </svg>
  );
}

export const serviceIcons = {
  sites: ReuniaoIcon,
  landing: PaginaIcon,
  agendamento: AgendaIcon,
  dashboards: PainelIcon,
} as const;

/* Ícones do carrossel de tecnologias, por tipo */

export function BracketsIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m8 6-5 6 5 6M16 6l5 6-5 6" />
    </svg>
  );
}

export function MarkupIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m10 4-4 16M18 8l3.5 4L18 16M6 8l-3.5 4L6 16" transform="translate(1.5 0)" />
    </svg>
  );
}

export function BrushIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M18.4 3.7a2.1 2.1 0 0 1 3 3L12 16l-4.5.9L8.4 12l10-8.3Z" />
      <path d="M4 21c1.8 0 3-1.2 3-2.6 0-1-.8-1.9-1.9-1.9C3.5 16.5 3.3 19 2 20c.6.6 1.2 1 2 1Z" />
    </svg>
  );
}

export function LayersIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12.5 9 5 9-5M3 17l9 5 9-5" opacity="0.6" />
    </svg>
  );
}

export function BoxIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.5 21 7v10l-9 4.5L3 17V7l9-4.5Z" />
      <path d="M3 7l9 4.5M12 21.5V11.5M21 7l-9 4.5" />
    </svg>
  );
}

export function DatabaseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      <path d="M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

export function CloudIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10a4.2 4.2 0 0 1-.6 8.5H7Z" />
    </svg>
  );
}

export function BranchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="8" r="2.2" />
      <path d="M6 7.2v9.6M18 10.2c0 3.3-2.7 4.3-5.5 4.6-2.2.3-4 .8-5 2.3" />
    </svg>
  );
}

export const techKindIcons = {
  linguagem: BracketsIcon,
  marcacao: MarkupIcon,
  estilo: BrushIcon,
  biblioteca: LayersIcon,
  framework: BoxIcon,
  banco: DatabaseIcon,
  plataforma: CloudIcon,
  ferramenta: BranchIcon,
} as const;
