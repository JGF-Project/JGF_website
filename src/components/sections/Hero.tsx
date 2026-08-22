import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowRightIcon,
  CheckIcon,
  GlobeIcon,
  MobileIcon,
} from "@/components/ui/icons";
import { ProjectShowcase } from "./ProjectShowcase";
import { content } from "@/content";

/** Ícone de cada benefício, na ordem em que aparecem no conteúdo. */
const ICONES_BENEFICIO = [CheckIcon, MobileIcon, GlobeIcon] as const;

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="inicio"
      className="relative scroll-mt-24 pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <Container>
        {/* 1. Texto principal, no canto superior esquerdo */}
        <Reveal>
          <p className="pill">{hero.badge}</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-5 max-w-4xl text-[2.5rem] leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-7xl">
            {hero.title}
            {/* Quebra proposital no desktop; no celular o texto flui sozinho */}
            <br className="hidden lg:block" />{" "}
            {hero.titleHighlight}
          </h1>
        </Reveal>

        {/* 2. Carrossel dos projetos, logo abaixo do título */}
        <Reveal delay={160}>
          <div className="mt-12 sm:mt-14">
            <ProjectShowcase variante="contido" />
          </div>
        </Reveal>

        {/* 3. Texto complementar e botões */}
        <Reveal delay={220}>
          <p className="mt-12 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-brand-vivo"
            >
              {hero.primaryCta}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center justify-center rounded-pill border border-border-forte px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </Reveal>

        {/* 4. Benefícios: em linha no desktop, empilhados no celular */}
        <Reveal delay={340}>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {hero.highlights.map((item, i) => {
              const Icon = ICONES_BENEFICIO[i] ?? CheckIcon;

              return (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="icon-chip mt-0.5 h-9 w-9 shrink-0">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {item.value}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {item.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
