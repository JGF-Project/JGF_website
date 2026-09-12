"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceIcons, GlobeIcon, PlusIcon } from "@/components/ui/icons";
import { content } from "@/content";

/**
 * Serviços, recolhidos por padrão.
 *
 * Cada item mostra só o ícone e o título; a descrição e os itens da lista
 * aparecem ao clicar. Um aberto por vez: com quatro serviços lado a lado,
 * deixar vários abertos empurraria a página de um jeito difícil de acompanhar.
 *
 * O painel aberto ocupa a linha inteira, abaixo da faixa de botões, em vez de
 * esticar o próprio card. Assim os quatro cards continuam alinhados e nada se
 * desloca lateralmente ao abrir.
 */
export function Services() {
  const { services } = content;
  const [aberto, setAberto] = useState<string | null>(null);
  const idBase = useId();

  const servicoAberto = services.items.find((s) => s.id === aberto) ?? null;

  return (
    <section id="servicos" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          subtitle={services.subtitle}
        />

        {/* No celular vira uma faixa que rola de lado, para os quatro caberem
            sem virar uma pilha alta demais antes do conteúdo. */}
        <div className="servicos-faixa mt-14">
          {services.items.map((service, i) => {
            const Icon =
              serviceIcons[service.id as keyof typeof serviceIcons] ?? GlobeIcon;
            const estaAberto = aberto === service.id;

            return (
              <Reveal key={service.id} delay={i * 70} className="servicos-celula">
                <button
                  type="button"
                  id={`${idBase}-${service.id}`}
                  className="servico-botao edge-glow"
                  data-aberto={estaAberto}
                  aria-expanded={estaAberto}
                  aria-controls={`${idBase}-painel`}
                  onClick={() =>
                    setAberto((atual) =>
                      atual === service.id ? null : service.id,
                    )
                  }
                >
                  <span className="icon-chip h-12 w-12">
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="servico-titulo">{service.title}</span>

                  <span className="servico-sinal" aria-hidden>
                    <PlusIcon className="h-3.5 w-3.5" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Um painel só, reaproveitado. `grid-template-rows` de 0fr para 1fr é
            o que permite animar até a altura do conteúdo sem chutar um
            max-height. */}
        <div
          id={`${idBase}-painel`}
          className="servico-painel"
          data-aberto={Boolean(servicoAberto)}
          role="region"
          aria-labelledby={
            servicoAberto ? `${idBase}-${servicoAberto.id}` : undefined
          }
        >
          <div className="servico-painel-interno">
            {servicoAberto && (
              <div className="panel p-6 sm:p-8">
                <p className="max-w-2xl text-base leading-relaxed text-muted text-pretty">
                  {servicoAberto.description}
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {servicoAberto.bullets.map((bullet) => (
                    <li key={bullet} className="servico-item">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
