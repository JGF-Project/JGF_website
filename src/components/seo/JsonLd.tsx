import { content } from "@/content";
import { site } from "@/lib/site";

/**
 * Dados estruturados (schema.org) para o Google entender quem é a JGF
 * e exibir as perguntas frequentes direto no resultado de busca.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#organizacao`,
        name: site.name,
        description: content.meta.description,
        url: site.url,
        email: site.email,
        areaServed: "BR",
        sameAs: [site.social.instagram.href],
        founder: content.team.members.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
        })),
        knowsAbout: content.services.items.map((service) => service.title),
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Conteúdo próprio e estático — não há entrada de usuário aqui.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
