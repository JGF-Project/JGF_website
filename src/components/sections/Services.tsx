import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon, serviceIcons, GlobeIcon } from "@/components/ui/icons";
import { content } from "@/content";

export function Services() {
  const { services } = content;

  return (
    <section id="servicos" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.items.map((service, i) => {
            const Icon =
              serviceIcons[service.id as keyof typeof serviceIcons] ?? GlobeIcon;

            return (
              <Reveal key={service.id} delay={i * 90}>
                {/* Card no estilo "Capital Efficiency": borda que acende,
                    chip de ícone e canto bem arredondado */}
                <article className="edge-glow group relative h-full overflow-hidden rounded-card p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-28 -right-28 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "var(--glow-a)" }}
                  />

                  <div className="icon-chip relative h-12 w-12">
                    <Icon className="h-[22px] w-[22px]" />
                  </div>

                  <h3 className="relative mt-5 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="tag">
                        <CheckIcon className="mr-1.5 h-3 w-3 shrink-0 text-brand" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
