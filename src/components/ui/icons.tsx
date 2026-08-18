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

export function ChartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M8 16v-3M12 16v-6M16 16v-4" />
    </svg>
  );
}

export const serviceIcons = {
  sites: GlobeIcon,
  landing: RocketIcon,
  agendamento: CalendarIcon,
  dashboards: ChartIcon,
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
