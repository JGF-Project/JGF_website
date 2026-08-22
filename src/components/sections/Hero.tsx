import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { HeroMockup } from "./HeroMockup";
import { content } from "@/content";

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="inicio"
      className="ambiente relative isolate scroll-mt-24 pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <Container>
        {/* Composição dividida: o argumento à esquerda, a prova à direita.
            No celular vira uma coluna só, com o mockup depois do texto. */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal>
              <span className="pill">{hero.badge}</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-semibold text-balance sm:text-5xl lg:text-6xl lg:leading-[1.06]">
                {hero.title}{" "}
                <span className="text-brand">{hero.titleHighlight}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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

            <Reveal delay={320}>
              <ul className="mt-10 flex flex-col gap-2.5 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
                {hero.highlights.map((item) => (
                  <li key={item.label}>
                    <span className="font-semibold text-foreground">
                      {item.value}
                    </span>
                    <span className="ml-2 text-muted">{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <HeroMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
