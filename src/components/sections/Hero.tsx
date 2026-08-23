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

/**
 * Bloco de apresentação logo abaixo do hero de tela cheia.
 *
 * O rótulo e o título principal moram no `HeroVisual`, sobre a imagem. O que
 * fica aqui é o resto do que já existia: a vitrine dos projetos, o texto
 * complementar, os dois botões e a linha de benefícios.
 */
export function Hero() {
  const { hero } = content;

  return (
    <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-24">
      <Container>
        <Reveal>
          <ProjectShowcase variante="contido" />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-12 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={140}>
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

        {/* Benefícios: em linha no desktop, empilhados no celular */}
        <Reveal delay={200}>
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
