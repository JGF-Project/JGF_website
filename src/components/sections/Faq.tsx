import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlusIcon } from "@/components/ui/icons";
import { content } from "@/content";

export function Faq() {
  const { faq } = content;

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          eyebrow={faq.eyebrow}
          title={faq.title}
          subtitle={faq.subtitle}
        />

        {/* Cards separados, cada um com a borda que acende da referência */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {faq.items.map((item, i) => (
            <Reveal key={item.question} delay={i * 60}>
              <details className="edge-glow group rounded-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted transition-transform duration-300 group-open:rotate-45 group-open:border-brand group-open:text-brand">
                    <PlusIcon />
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-muted">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
