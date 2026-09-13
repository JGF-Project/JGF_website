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
  /**
   * De onde sai o painel de subitens. Vazio significa link simples — nem todo
   * item vira menu, só onde a lista ajuda a entender o que existe.
   *
   * É o nome da fonte, não a lista em si: os subitens são montados a partir do
   * conteúdo da própria seção, então acrescentar um serviço ou um projeto
   * atualiza o menu sozinho, sem repetir texto aqui.
   */
  menu?: "servicos" | "projetos";
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
   * Imagem larga do projeto, usada no hero de tela cheia. Precisa aguentar
   * `object-fit: cover` em qualquer proporção, então é uma arte panorâmica,
   * diferente do mockup quadrado do card. `null` enquanto a arte não existir:
   * o projeto simplesmente não entra no rodízio do hero.
   */
  banner: string | null;
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

/** Como o campo é desenhado e validado no formulário de prévia. */
export type PreviaTipo =
  | "texto"
  | "email"
  | "telefone"
  | "textarea"
  | "selecao"
  | "opcoes";

export interface PreviaCampo {
  id: string;
  /** A pergunta, escrita como alguém falaria. */
  label: string;
  placeholder?: string;
  tipo: PreviaTipo;
  /** Alternativas de `selecao` e `opcoes`. */
  opcoes?: readonly string[];
  obrigatorio: boolean;
  /** Mensagem exibida quando o campo obrigatório não passa na conferência. */
  erro?: string;
  /** Altura da textarea, em linhas. */
  linhas?: number;
}

export interface PreviaEtapa {
  id: string;
  /** Rótulo curto, usado na barra de progresso. */
  nome: string;
  titulo: string;
  campos: readonly PreviaCampo[];
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
    /** Chamada comercial do bloco à direita da imagem. */
    pitch: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: { value: string; label: string }[];
  };
  previa: {
    eyebrow: string;
    title: string;
    subtitle: string;
    progressoLabel: string;
    etapas: readonly PreviaEtapa[];
    continuar: string;
    voltar: string;
    revisao: {
      nome: string;
      titulo: string;
      subtitle: string;
      editar: string;
      enviar: string;
      naoInformado: string;
    };
    sucesso: {
      titulo: string;
      descricao: string;
      aviso: string;
      voltar: string;
    };
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
    /** Botão do carrossel: leva ao projeto detalhado, não ao site externo. */
    discoverProject: string;
    comingSoon: string;
    featuresLabel: string;
    techLabel: string;
    /** Vitrine de telas exibida no topo da seção. */
    galleryTitle: string;
    gallerySubtitle: string;
    galleryPending: string;
    /** Textos dos controles do carrossel do hero. */
    carrossel: {
      rotulo: string;
      /** Aceita {atual}, {total} e {nome}. Lido em voz alta a cada troca. */
      status: string;
      pausar: string;
      retomar: string;
    };
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
