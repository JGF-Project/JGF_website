import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProjectShowcase } from "./ProjectShowcase";
import { content } from "@/content";

export function Hero() {
  const { hero } = content;

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-[72px] pb-16 sm:pb-24"
    >
      {/* Banner de largura total: fica fora do Container de propósito, para
          ocupar a viewport de ponta a ponta como no carrossel do Itaú. */}
      <ProjectShowcase />

      <Container>
        <div className="mt-16 flex flex-col items-center text-center sm:mt-20">
          <Reveal>
            <span className="pill">{hero.badge}</span>
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
                className="group inline-flex items-center justify-center gap-2 rounded-card bg-brand px-8 py-4 text-sm font-semibold text-background transition-colors hover:bg-brand-vivo"
              >
                {hero.primaryCta}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#projetos"
                className="inline-flex items-center justify-center rounded-card border border-border-forte px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Três afirmações curtas em linha corrida, não em três cards iguais:
            a informação é curta demais para virar caixa. */}
        <Reveal delay={360}>
          <ul className="mx-auto mt-14 flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10">
            {hero.highlights.map((item) => (
              <li key={item.label} className="text-sm">
                <span className="font-semibold text-foreground">
                  {item.value}
                </span>
                <span className="ml-2 text-muted">{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
