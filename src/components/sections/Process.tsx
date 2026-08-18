import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/content";

/** Etiquetas exibidas em cada etapa, como os cards do "Design process". */
const ETIQUETAS: Record<string, string[]> = {
  "01": ["Briefing", "Escopo", "Orçamento"],
  "02": ["Estrutura", "Identidade visual", "Aprovação"],
  "03": ["Código", "Testes", "Responsivo"],
  "04": ["Domínio", "Publicação", "Suporte"],
};

export function Process() {
  const { process } = content;

  return (
    <section
      id="processo"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <Container>
        {/* Painel único envolvendo a seção, como o "Design process" da referência */}
        <Reveal>
          <div className="panel noise p-6 sm:p-10 md:p-12">
            <SectionHeading
              eyebrow={process.eyebrow}
              title={process.title}
              subtitle={process.subtitle}
              align="left"
            />

            {/* Cards alinhados e do mesmo tamanho: o grid estica todos os
                itens da linha e as etiquetas ficam presas na base. */}
            <ol className="relative z-10 mt-12 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
              {process.steps.map((step, i) => (
                <Reveal as="li" key={step.step} delay={i * 100}>
                  <article className="edge-glow flex h-full min-h-[280px] flex-col rounded-card p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <span className="font-mono text-xs text-muted">
                        {step.step}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                      {(ETIQUETAS[step.step] ?? []).map((etiqueta) => (
                        <li key={etiqueta} className="tag">
                          {etiqueta}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
