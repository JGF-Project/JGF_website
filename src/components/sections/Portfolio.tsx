import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalIcon } from "@/components/ui/icons";
import { ProjectShowcase } from "./ProjectShowcase";
import { content } from "@/content";
import type { Project } from "@/content/types";

export function Portfolio() {
  const { portfolio } = content;

  return (
    <section id="projetos" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={portfolio.eyebrow}
          title={portfolio.title}
          subtitle={portfolio.subtitle}
        />
      </Container>

      {/* Vitrine de largura total: o projeto aparece grande antes de ser
          explicado. Fica fora do Container de propósito. */}
      <div className="mt-12">
        <ProjectShowcase />
      </div>

      <Container>
        <div className="mt-16 flex flex-col gap-8">
          {portfolio.projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <ProjectCard project={project} reversed={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  reversed,
}: {
  project: Project;
  reversed: boolean;
}) {
  const { portfolio } = content;
  const isComingSoon = project.status === "coming-soon";

  return (
    <article
      // Alvo da navegação vinda do carrossel. O destaque é feito por CSS
      // (`:target`), sem estado nem JavaScript.
      id={`projeto-${project.id}`}
      className={`panel noise grid scroll-mt-28 lg:grid-cols-2 ${
        isComingSoon ? "opacity-90" : ""
      }`}
    >
      {/* Área da imagem */}
      <div
        className={`relative min-h-[260px] lg:min-h-[400px] ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={project.screenshotAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <ScreenshotPlaceholder label={project.name} />
        )}
      </div>

      {/* Conteúdo */}
      <div className="relative flex flex-col justify-center gap-5 p-7 sm:p-10">
        <div>
          <span className="pill text-xs text-muted">{project.category}</span>

          <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-brand">
            {project.tagline}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.features.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-muted uppercase">
              {portfolio.featuresLabel}
            </h4>
            <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="border-l border-border pl-3 text-sm text-muted"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.tech.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-muted uppercase">
              {portfolio.techLabel}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-1">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-card bg-brand px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-brand-vivo"
            >
              {portfolio.viewProject}
              <ExternalIcon className="h-4 w-4" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-card border border-border-forte px-7 py-3.5 text-sm font-semibold text-muted">
              {portfolio.comingSoon}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/** Espaço reservado até o screenshot real do projeto ser adicionado. */
function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <div className="icon-chip h-14 w-14">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="16" rx="2.5" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="m4 17 4.5-4.5a1.8 1.8 0 0 1 2.5 0L20 20" />
          </svg>
        </div>
        <p className="text-sm font-medium text-muted">
          Screenshot de {label} em breve
        </p>
      </div>
    </div>
  );
}
