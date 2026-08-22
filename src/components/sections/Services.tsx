import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceIcons, GlobeIcon } from "@/components/ui/icons";
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

        {/* `auto-rows-fr` iguala a altura das linhas: os quatro cards ficam
            do mesmo tamanho em qualquer largura. */}
        <div className="mt-14 grid auto-rows-fr items-stretch gap-5 sm:grid-cols-2">
          {services.items.map((service, i) => {
            const Icon =
              serviceIcons[service.id as keyof typeof serviceIcons] ?? GlobeIcon;

            return (
              <Reveal key={service.id} delay={i * 90}>
                {/* Card no estilo "Capital Efficiency": borda que acende,
                    chip de ícone e canto bem arredondado */}
                {/* Composição centralizada: chip do ícone no topo, título e
                    apoio abaixo, como na referência. */}
                <article className="edge-glow relative flex h-full flex-col items-center overflow-hidden rounded-card p-8 text-center sm:p-10">
                  <div className="icon-chip h-14 w-14">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-1.5">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-muted">
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
