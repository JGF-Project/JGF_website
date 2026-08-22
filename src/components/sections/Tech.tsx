import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import { TechCarousel } from "./TechCarousel";
import { content } from "@/content";

export function Tech() {
  const { tech } = content;
  const ultimaEtapa = tech.pipeline.length - 1;

  return (
    <section
      id="tecnologias"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      {/* Sem faixa de cor própria: o fundo animado do site precisa atravessar
          esta seção sem corte, como uma composição única. */}
      <Container>
        <SectionHeading
          eyebrow={tech.eyebrow}
          title={tech.title}
          subtitle={tech.subtitle}
        />

        {/* Fluxo completo: deixa claro que o trabalho vai até o banco de dados */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tech.pipeline.map((etapa, i) => (
              <span key={etapa} className="flex items-center gap-2">
                <span className="pill border-accent/40 text-sm font-semibold text-accent">
                  {etapa}
                </span>
                {i < ultimaEtapa && (
                  <ArrowRightIcon className="h-3.5 w-3.5 text-accent/60" />
                )}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 sm:mt-12">
            <TechCarousel items={tech.items} />
          </div>
        </Reveal>

        <p className="mt-8 text-center text-xs text-muted sm:text-sm">
          Passe o mouse sobre uma tecnologia para ver os detalhes. No celular,
          toque no card para abrir e arraste para o lado para navegar.
        </p>
      </Container>
    </section>
  );
}
