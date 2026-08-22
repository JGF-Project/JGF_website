import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { content } from "@/content";
import type { TeamMember } from "@/content/types";

export function Team() {
  const { team } = content;

  return (
    <section id="equipe" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={team.eyebrow}
          title={team.title}
          subtitle={team.subtitle}
        />

        {/* Apresentação institucional em painel, estilo "Project overview" */}
        <Reveal delay={80}>
          <div className="panel noise mx-auto mt-12 max-w-3xl p-7 sm:p-10">
            {team.about.map((paragraph, i) => (
              <p
                key={i}
                className={`relative text-base leading-relaxed text-pretty ${
                  i === 0 ? "font-medium" : "mt-4 text-muted"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member, i) => (
            <Reveal key={member.id} delay={i * 100}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="edge-glow group flex h-full flex-col overflow-hidden rounded-card">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Foto de ${member.name}, ${member.role} da JGF Company`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center"
          />
        ) : (
          <PhotoPlaceholder initials={member.initials} name={member.name} />
        )}

      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-semibold">{member.name}</h3>
        <p className="text-sm font-medium text-brand">{member.role}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {member.description}
        </p>

        {member.links.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-4">
            {member.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag transition-colors hover:border-brand hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

/**
 * Espaço reservado até a foto real chegar.
 * Propositalmente sem retrato genérico: exibe apenas as iniciais.
 */
function PhotoPlaceholder({
  initials,
  name,
}: {
  initials: string;
  name: string;
}) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className="icon-chip h-24 w-24 text-2xl font-semibold"
          aria-hidden
        >
          {initials}
        </div>
        <span className="text-xs font-medium text-muted">
          Foto de {name} em breve
        </span>
      </div>
    </div>
  );
}
