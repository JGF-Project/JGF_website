import type { SiteContent } from "./types";
import { site } from "@/lib/site";

export const ptBR: SiteContent = {
  locale: "pt-BR",

  nav: {
    items: [
      { label: "Início", href: "#inicio" },
      { label: "Serviços", href: "#servicos" },
      { label: "Projetos", href: "#projetos" },
      { label: "Tecnologias", href: "#tecnologias" },
      { label: "Equipe", href: "#equipe" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Fale conosco",
  },

  meta: {
    title: "JGF Company | Desenvolvimento de sites, sistemas e dashboards",
    description:
      "A JGF Company cria sites, landing pages, sistemas de agendamento e dashboards sob medida para empresas e profissionais. Fale com a gente e tire seu projeto do papel.",
    keywords: [
      "desenvolvimento web",
      "criação de sites",
      "landing page",
      "sistema de agendamento",
      "dashboard",
      "JGF Company",
    ],
  },

  hero: {
    badge: "Desenvolvimento web sob medida",
    title: "Sites e sistemas feitos",
    titleHighlight: "sob medida para o seu negócio",
    subtitle:
      "A JGF Company desenvolve sites institucionais, landing pages, sistemas de agendamento e dashboards. Cada projeto é construído do zero, de acordo com a necessidade de quem contrata.",
    primaryCta: "Iniciar um projeto",
    secondaryCta: "Ver nossos projetos",
    highlights: [
      { value: "Sob medida", label: "Nada de template pronto" },
      { value: "Responsivo", label: "Funciona bem no celular" },
      { value: "Direto ao ponto", label: "Você fala com quem programa" },
    ],
  },

  services: {
    eyebrow: "O que fazemos",
    title: "Serviços",
    subtitle:
      "Construímos a presença digital do seu negócio com foco em clareza, velocidade e resultado.",
    items: [
      {
        id: "sites",
        title: "Sites institucionais",
        description:
          "O endereço oficial da sua empresa na internet, com visual próprio e páginas leves que abrem rápido em qualquer aparelho.",
        bullets: [
          "Design exclusivo, sem template",
          "Adaptado a celular, tablet e computador",
          "Mesma experiência em qualquer tamanho de tela",
        ],
      },
      {
        id: "landing",
        title: "Landing pages",
        description:
          "Páginas pensadas para um objetivo só: transformar quem visita em cliente.",
        bullets: [
          "Estrutura focada em conversão",
          "Carregamento rápido",
          "Chamadas para ação claras",
        ],
      },
      {
        id: "agendamento",
        title: "Sistemas de agendamento",
        description:
          "Seus clientes marcam horário sozinhos, pelo celular, a qualquer hora, sem precisar ligar nem esperar resposta.",
        bullets: [
          "Contas de cliente e login",
          "Escolha de serviço, dia e horário",
          "Painel para acompanhar as reservas",
        ],
      },
      {
        id: "dashboards",
        title: "Dashboards e painéis",
        description:
          "Seus números organizados em uma tela só, para decidir com base em informação e não em achismo.",
        bullets: [
          "Indicadores atualizados",
          "Gráficos e relatórios",
          "Níveis de acesso por usuário",
        ],
      },
    ],
  },

  process: {
    eyebrow: "Como trabalhamos",
    title: "Do primeiro contato ao projeto no ar",
    subtitle:
      "Um processo simples e transparente. Você acompanha cada etapa e sabe o que esperar.",
    steps: [
      {
        step: "01",
        title: "Conversa inicial",
        description:
          "Entendemos seu negócio, seu público e o que o projeto precisa resolver. Daí sai o escopo e o orçamento, sem compromisso.",
      },
      {
        step: "02",
        title: "Design e estrutura",
        description:
          "Montamos a organização das páginas e a identidade visual do projeto. Você aprova antes de escrevermos qualquer linha de código.",
      },
      {
        step: "03",
        title: "Desenvolvimento",
        description:
          "Colocamos o projeto de pé com tecnologias atuais, testando em celular, tablet e computador ao longo do caminho.",
      },
      {
        step: "04",
        title: "Publicação e suporte",
        description:
          "Publicamos o projeto, configuramos o domínio e seguimos por perto para ajustes e melhorias.",
      },
    ],
  },

  portfolio: {
    eyebrow: "Portfólio",
    title: "Projetos que já estão no ar",
    subtitle:
      "Trabalhos reais desenvolvidos pela JGF Company para clientes reais.",
    viewProject: "Visualizar projeto",
    discoverProject: "Conhecer projeto",
    comingSoon: "Em breve",
    featuresLabel: "Principais funcionalidades",
    techLabel: "Tecnologias utilizadas",
    galleryTitle: "Telas dos projetos",
    gallerySubtitle:
      "Um passeio pelas interfaces que já entregamos. Passe o mouse para parar.",
    galleryPending: "Imagem em breve",
    projects: [
      {
        id: "rr-barbearia",
        name: "RR Barbearia",
        category: "Sistema de agendamento",
        tagline: "Agendamento online para barbearia",
        description:
          "Plataforma que permite ao cliente da barbearia criar uma conta e reservar seu horário direto pelo celular, sem precisar ligar ou esperar resposta. O site também apresenta a barbearia e uma galeria com os trabalhos realizados.",
        features: [
          "Criação de conta e login do cliente",
          "Escolha de serviço, dia e horário",
          "Área “Meus agendamentos” para acompanhar as reservas",
          "Galeria com os cortes da barbearia",
        ],
        // Preenchido quando a equipe confirmar a stack usada no projeto.
        tech: [],
        screenshot: null,
        screenshotAlt:
          "Tela inicial do site da RR Barbearia com o agendamento online",
        gallery: ["/portfolio/rr-barbearia.png"],
        href: "https://rrbarbearia.vercel.app/#inicio",
        status: "live",
      },
      {
        id: "confirmai",
        name: "confirmai",
        category: "Automação para clínicas",
        tagline: "Confirmação de consultas pelo WhatsApp",
        description:
          "Sistema que avisa o paciente 24 horas e 2 horas antes da consulta pelo WhatsApp, entende a resposta dele e atualiza a agenda da clínica sozinho. A recepção deixa de ligar paciente por paciente, e o horário cancelado aparece cedo o bastante para ser reofertado.",
        features: [
          "Lembretes automáticos em 24h e 2h antes",
          "Leitura da resposta do paciente e atualização da agenda",
          "Caixa “precisa de atenção” para respostas não reconhecidas",
          "Simulador de perda mensal com os números da clínica",
        ],
        tech: [],
        screenshot: null,
        screenshotAlt:
          "Tela inicial do confirmai mostrando a confirmação de consultas por WhatsApp",
        gallery: ["/portfolio/confirmai.png"],
        href: "https://confirmaclinica.vercel.app/",
        status: "live",
      },
      {
        id: "vlm-presentes",
        name: "VLM Presentes",
        category: "Catálogo e vitrine",
        tagline: "Brindes corporativos e presentes personalizados",
        description:
          "Site de uma empresa de personalização de São Bernardo do Campo, dividido em dois caminhos: empresas que buscam brindes e uniformes, e pessoas que querem presentear. O catálogo é filtrado por categoria e técnica, e o contato cai direto no WhatsApp de quem produz.",
        features: [
          "Catálogo com dez linhas de produto e seis técnicas",
          "Filtro por categoria já aplicado ao entrar",
          "Calendário de datas comemorativas com prazo de produção",
          "Orçamento direto pelo WhatsApp",
        ],
        tech: [],
        screenshot: null,
        screenshotAlt:
          "Tela inicial do site da VLM Presentes com brindes corporativos e presentes personalizados",
        gallery: ["/portfolio/vlm-presentes.png"],
        href: "https://vlmpresentes.vercel.app/",
        status: "live",
      },
      {
        id: "barber-daniels",
        name: "Barber Daniel's",
        category: "Sistema de agendamento",
        tagline: "Agendamento online para barbearia",
        description:
          "Agendamento em que o cliente reserva o horário sem precisar criar conta: escolhe o serviço, o dia e a hora, informa nome e telefone, e pronto. O site também apresenta a barbearia, os planos mensais e uma galeria com os cortes realizados.",
        features: [
          "Agendamento sem necessidade de criar conta",
          "Escolha de serviço, dia e horário",
          "Área “Meus agendamentos” para consultar a reserva",
          "Galeria de cortes e planos mensais",
        ],
        tech: [],
        screenshot: null,
        screenshotAlt:
          "Tela inicial do site da Barber Daniel's com o agendamento online",
        gallery: ["/portfolio/barber-daniels.png"],
        href: "https://barber-daniels.vercel.app/",
        status: "live",
      },
    ],
  },

  tech: {
    eyebrow: "Stack",
    title: "Tecnologias que usamos",
    subtitle:
      "Desenvolvemos sistemas completos, da interface ao banco de dados. Selecione uma tecnologia para entender o que ela é e onde a usamos.",
    pipeline: ["Interface", "Back-end", "APIs", "Banco de Dados"],
    items: [
      {
        id: "react",
        name: "React",
        category: "Biblioteca Front-end",
        kind: "biblioteca",
        description:
          "Biblioteca JavaScript utilizada para construir interfaces modernas e componentes reutilizáveis.",
        uses: [
          "Sites",
          "Sistemas web",
          "Dashboards",
          "Aplicações interativas",
          "Interfaces modernas",
        ],
      },
      {
        id: "nextjs",
        name: "Next.js",
        category: "Framework Front-end",
        kind: "framework",
        description:
          "Framework construído sobre o React, usado para criar sites e sistemas rápidos, com carregamento otimizado e boa indexação no Google.",
        uses: [
          "Sites institucionais",
          "Landing pages",
          "Sistemas web",
          "APIs",
        ],
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "Linguagem de programação",
        kind: "linguagem",
        description:
          "Extensão do JavaScript que adiciona tipos ao código, ajudando a evitar erros antes mesmo de o sistema rodar.",
        uses: ["Front-end", "Back-end", "Sistemas web", "Projetos em equipe"],
      },
      {
        id: "javascript",
        name: "JavaScript",
        category: "Linguagem de programação",
        kind: "linguagem",
        description:
          "Linguagem fundamental para adicionar interatividade e comportamento às aplicações web.",
        uses: [
          "Front-end",
          "Back-end",
          "APIs",
          "Aplicações web",
          "Aplicações interativas",
        ],
      },
      {
        id: "html5",
        name: "HTML5",
        category: "Linguagem de marcação",
        kind: "marcacao",
        description:
          "Linguagem de marcação responsável pela estrutura e organização do conteúdo de páginas web.",
        uses: [
          "Sites",
          "Landing pages",
          "Sistemas web",
          "Estrutura do front-end",
        ],
      },
      {
        id: "css3",
        name: "CSS3",
        category: "Estilização",
        kind: "estilo",
        description:
          "Tecnologia utilizada para estilizar interfaces, controlar layouts, cores, espaçamentos, animações e responsividade.",
        uses: [
          "Design de sites",
          "Interfaces",
          "Responsividade",
          "Animações",
          "Layouts",
        ],
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        category: "Estilização",
        kind: "estilo",
        description:
          "Ferramenta de estilização que agiliza a construção de interfaces consistentes e responsivas.",
        uses: ["Interfaces", "Design de sites", "Responsividade", "Dashboards"],
      },
      {
        id: "nodejs",
        name: "Node.js",
        category: "Back-end",
        kind: "plataforma",
        description:
          "Ambiente que executa JavaScript no servidor, usado para construir back-ends, APIs e integrações.",
        uses: ["Back-end", "APIs", "Automação", "Integrações"],
      },
      {
        id: "mysql",
        name: "MySQL",
        category: "SGBD / Banco de dados",
        kind: "banco",
        description:
          "Sistema gerenciador de banco de dados relacional utilizado para armazenar, organizar e consultar informações.",
        uses: [
          "Sistemas web",
          "E-commerces",
          "Sistemas empresariais",
          "APIs",
        ],
      },
      {
        id: "supabase",
        name: "Supabase",
        category: "Back-end / Banco de dados",
        kind: "banco",
        description:
          "Plataforma de desenvolvimento que fornece recursos de back-end e banco de dados, utilizando PostgreSQL como banco principal.",
        uses: [
          "Banco de dados",
          "Back-end",
          "Autenticação",
          "APIs",
          "Dados em tempo real",
        ],
      },
      {
        id: "git",
        name: "Git",
        category: "Ferramenta",
        kind: "ferramenta",
        description:
          "Sistema de controle de versão utilizado para acompanhar alterações no código e facilitar o trabalho em equipe.",
        uses: [
          "Controle de versões",
          "Trabalho em equipe",
          "Projetos de software",
        ],
      },
      {
        id: "github",
        name: "GitHub",
        category: "Plataforma",
        kind: "plataforma",
        description:
          "Plataforma utilizada para hospedar repositórios, colaborar em projetos e gerenciar código-fonte.",
        uses: [
          "Hospedagem de código",
          "Trabalho em equipe",
          "Versionamento",
        ],
      },
      {
        id: "vercel",
        name: "Vercel",
        category: "Plataforma",
        kind: "plataforma",
        description:
          "Plataforma de hospedagem e publicação usada para colocar sites e sistemas no ar com desempenho e segurança.",
        uses: ["Publicação", "Hospedagem", "Domínios", "Deploy contínuo"],
      },
    ],
  },

  team: {
    eyebrow: "Quem somos",
    title: "Quem está por trás da JGF",
    subtitle:
      "Três desenvolvedores com um propósito em comum: criar soluções digitais bem feitas.",
    about: [
      "A JGF Company nasceu da união de Guilherme, João Lucas e Fabrício em torno de um interesse em comum: tecnologia e desenvolvimento web.",
      "Somos uma equipe jovem e técnica, focada em criar soluções digitais personalizadas para empresas e profissionais. Cada projeto é construído do zero, de acordo com a necessidade real de quem contrata. Você conversa diretamente com quem coloca a mão no código.",
    ],
    members: [
      {
        id: "guilherme",
        name: "Guilherme",
        role: "Co-fundador / Desenvolvedor",
        description:
          "Co-fundador da JGF Company. Atua no desenvolvimento dos projetos da empresa, participando da construção das soluções entregues aos clientes.",
        photo: null,
        initials: "G",
        links: [],
      },
      {
        id: "joao-lucas",
        name: "João Lucas",
        role: "Co-fundador / Desenvolvedor",
        description:
          "Co-fundador da JGF Company. Atua no desenvolvimento dos projetos da empresa, acompanhando as entregas do início até a publicação.",
        photo: null,
        initials: "JL",
        links: [],
      },
      {
        id: "fabricio",
        name: "Fabrício",
        role: "Co-fundador / Desenvolvedor",
        description:
          "Co-fundador da JGF Company. Atua no desenvolvimento dos projetos da empresa, contribuindo na construção e no ajuste das soluções.",
        photo: null,
        initials: "F",
        links: [],
      },
    ],
  },

  faq: {
    eyebrow: "Dúvidas",
    title: "Perguntas frequentes",
    subtitle: "Não achou o que procurava? É só chamar a gente por e-mail.",
    items: [
      {
        question: "Quanto custa um projeto com a JGF Company?",
        answer:
          "Depende do que o projeto precisa ter. Uma landing page e um sistema de agendamento com contas de usuário são trabalhos de tamanhos bem diferentes. Por isso o primeiro passo é uma conversa para entender sua necessidade. O orçamento é feito sob medida e sem compromisso.",
      },
      {
        question: "Quanto tempo leva para o site ficar pronto?",
        answer:
          "O prazo é definido junto com você depois que o escopo estiver fechado, e depende do tamanho do projeto e da agilidade no envio dos conteúdos (textos, fotos e logo). Combinamos as datas antes de começar e mantemos você informado durante o desenvolvimento.",
      },
      {
        question: "O site funciona bem no celular?",
        answer:
          "Sim. Todos os nossos projetos são desenvolvidos para se adaptar a qualquer tela, de celular a computador. Testamos em diferentes tamanhos antes da entrega.",
      },
      {
        question: "Vocês cuidam do domínio e da hospedagem?",
        answer:
          "Sim, ajudamos a registrar o domínio, configurar a hospedagem e colocar o projeto no ar. Você fica como dono do domínio e dos acessos.",
      },
      {
        question: "E depois que o projeto for entregue?",
        answer:
          "Continuamos disponíveis para ajustes, correções e novas funcionalidades. É só entrar em contato que combinamos o que precisa ser feito.",
      },
      {
        question: "Preciso saber de tecnologia para trabalhar com vocês?",
        answer:
          "Não. Explicamos cada etapa em linguagem simples e cuidamos da parte técnica. Você só precisa conhecer bem o seu negócio e o que quer alcançar com o projeto.",
      },
    ],
  },

  contact: {
    eyebrow: "Contato",
    title: "Vamos tirar seu projeto do papel?",
    subtitle:
      "Conte o que você tem em mente. Respondemos com as próximas etapas e um orçamento sem compromisso.",
    emailLabel: "E-mail",
    emailCta: "Enviar e-mail",
    copyLabel: "Copiar e-mail",
    copiedLabel: "E-mail copiado!",
    socialLabel: "Também estamos aqui",
  },

  footer: {
    tagline:
      "Sites, landing pages, sistemas de agendamento e dashboards sob medida.",
    navLabel: "Navegação",
    contactLabel: "Contato",
    rights: `© ${new Date().getFullYear()} ${site.name}. Todos os direitos reservados.`,
    builtWith: "Feito com Next.js e Tailwind CSS.",
  },
};
