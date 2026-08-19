/**
 * Contrato de conteúdo do site.
 *
 * Toda a escrita fica fora dos componentes. Para publicar o site em outro
 * idioma no futuro, basta criar `src/content/en.ts` implementando esta mesma
 * interface e registrá-lo em `src/content/index.ts` — nenhum componente muda.
 */

export interface NavItem {
  label: string;
  href: string;
}


export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  /** Vazio enquanto as tecnologias não forem confirmadas — a lista some do card. */
  tech: string[];
  /** Caminho em /public. Sem screenshot, o card exibe um espaço reservado. */
  screenshot: string | null;
  screenshotAlt: string;
  /**
   * Telas do projeto para a vitrine. Cada posição vira um quadro na faixa:
   * com caminho preenchido mostra a imagem, vazia mostra "imagem em breve".
   */
  gallery: (string | null)[];
  href: string | null;
  status: "live" | "coming-soon";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  /** Caminho em /public/equipe. `null` até a foto real ser enviada. */
  photo: string | null;
  initials: string;
  links: { label: string; href: string }[];
}

/** Define o ícone e o realce visual de cada tecnologia no carrossel. */
export type TechKind =
  | "linguagem"
  | "marcacao"
  | "estilo"
  | "biblioteca"
  | "framework"
  | "banco"
  | "plataforma"
  | "ferramenta";

export interface TechItem {
  id: string;
  name: string;
  category: string;
  kind: TechKind;
  /** O que é a tecnologia, em uma ou duas frases. */
  description: string;
  /** Para que serve / onde usamos, exibido como etiquetas. */
  uses: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  locale: string;
  nav: {
    items: NavItem[];
    cta: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Service[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    subtitle: string;
    projects: Project[];
    viewProject: string;
    comingSoon: string;
    featuresLabel: string;
    techLabel: string;
    /** Vitrine de telas exibida no topo da seção. */
    galleryTitle: string;
    gallerySubtitle: string;
    galleryPending: string;
  };
  tech: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Fluxo "Interface → Back-end → APIs → Banco de Dados". */
    pipeline: string[];
    items: TechItem[];
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    about: string[];
    members: TeamMember[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    emailCta: string;
    copyLabel: string;
    copiedLabel: string;
    socialLabel: string;
  };
  footer: {
    tagline: string;
    navLabel: string;
    contactLabel: string;
    rights: string;
    builtWith: string;
  };
}
