import {
  ArrowRightIcon,
  CheckIcon,
  GlobeIcon,
  MobileIcon,
} from "@/components/ui/icons";
import { content } from "@/content";

/** Ícone de cada benefício, na ordem em que aparecem no conteúdo. */
const ICONES_BENEFICIO = [CheckIcon, MobileIcon, GlobeIcon] as const;

/**
 * Texto de apoio do hero: parágrafo, os dois botões e a linha de benefícios.
 *
 * Aparece em dois lugares, e um só existe de cada vez:
 *
 * - no desktop, dentro do palco do hero, à direita do quadro reduzido;
 * - abaixo de `lg`, como seção normal logo depois do hero.
 *
 * A cópia inativa fica em `display: none`, então some também da árvore de
 * acessibilidade — leitor de tela enxerga um bloco só.
 */
export function HeroApoio({ compacto = false }: { compacto?: boolean }) {
  const { hero } = content;

  return (
    <>
      <h2
        className={`font-semibold text-balance ${
          compacto
            ? "max-w-lg text-3xl leading-[1.1] xl:text-4xl"
            : "max-w-xl text-3xl leading-[1.1] sm:text-4xl"
        }`}
      >
        {hero.pitch}
      </h2>

      <p
        className={
          compacto
            ? "mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty"
            : "mt-4 max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg"
        }
      >
        {hero.subtitle}
      </p>

      <div
        className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
          compacto ? "mt-6" : "mt-7"
        }`}
      >
        {/* Leva à seção de prévia, logo abaixo. A rolagem é suave pelo
            `scroll-behavior: smooth` que já vale para o documento inteiro,
            então continua funcionando sem JavaScript e com clique do meio. */}
        <a
          href="#previa"
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-brand-vivo"
        >
          {hero.primaryCta}
          <ArrowRightIcon className="h-4 w-4" />
        </a>
        <a
          href="#projetos"
          className="inline-flex items-center justify-center rounded-pill border border-border-forte px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
        >
          {hero.secondaryCta}
        </a>
      </div>

      <ul
        className={
          compacto
            ? "mt-8 grid gap-5 sm:grid-cols-3"
            : "mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8"
        }
      >
        {hero.highlights.map((item, i) => {
          const Icon = ICONES_BENEFICIO[i] ?? CheckIcon;

          return (
            <li key={item.label} className="flex items-start gap-3">
              <span className="icon-chip mt-0.5 h-9 w-9 shrink-0">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {item.value}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {item.label}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
