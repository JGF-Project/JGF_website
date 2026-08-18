import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { content } from "@/content";

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="pill text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {hero.badge}
            </span>
          </Reveal>

          <Reveal delay={90}>
            {/* Título em cor única, sem gradiente: branco no escuro,
                preto no claro, como os títulos da referência */}
            <h1 className="mt-8 max-w-4xl text-4xl font-semibold text-balance text-foreground sm:text-6xl md:text-7xl md:leading-[1.04]">
              {hero.title} {hero.titleHighlight}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 text-pretty sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={270}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Botão principal: pílula ciano sólida, como o "Supply & Borrow" */}
              <a
                href="#contato"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-background shadow-[0_16px_40px_-12px_var(--glow-a)] transition-transform hover:-translate-y-0.5"
              >
                {hero.primaryCta}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#projetos"
                className="pill px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Destaques em painel único dividido, como os stats da referência */}
        <Reveal delay={360}>
          <div className="panel noise mx-auto mt-16 max-w-4xl">
            <ul className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {hero.highlights.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 px-6 py-7 text-center"
                >
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="text-sm text-muted">{item.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
