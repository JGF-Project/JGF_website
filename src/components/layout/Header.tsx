"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { ChevronDownIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { content } from "@/content";
import type { NavItem } from "@/content/types";

/**
 * Subitens de um painel, montados a partir do conteúdo da própria seção.
 *
 * Ficam aqui, e não no bloco `nav` do conteúdo, para não repetir o nome de
 * cada serviço e de cada projeto em dois lugares: acrescentar um serviço em
 * `pt-BR.ts` já o faz aparecer no menu.
 */
function subitens(fonte: NonNullable<NavItem["menu"]>) {
  if (fonte === "servicos") {
    return content.services.items.map((s) => ({
      href: `#servico-${s.id}`,
      label: s.title,
      apoio: s.description,
    }));
  }

  return content.portfolio.projects.map((p) => ({
    href: `#projeto-${p.id}`,
    label: p.name,
    apoio: p.tagline,
  }));
}

export function Header() {
  const { nav } = content;
  const [rolado, setRolado] = useState(false);
  const [open, setOpen] = useState(false);
  /** Item expandido no menu do celular, onde não existe cursor para pairar. */
  const [expandido, setExpandido] = useState<string | null>(null);
  /** Seção visível no momento, para marcar o item correspondente. */
  const [ativa, setAtiva] = useState<string>("#inicio");

  useEffect(() => {
    const onScroll = () => setRolado(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Marcador da seção ativa. Observa cada âncora do menu e escolhe a que
   * estiver mais alta dentro da faixa de leitura, para o indicador
   * acompanhar o que o visitante está lendo.
   */
  useEffect(() => {
    const alvos = nav.items
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    if (alvos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visiveis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visiveis[0]) setAtiva(`#${visiveis[0].target.id}`);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    alvos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [nav.items]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Tira o foco do painel aberto, que é o que o mantém visível.
      (document.activeElement as HTMLElement | null)?.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function fecharMenu() {
    setOpen(false);
    setExpandido(null);
  }

  return (
    <header className="nav-barra" data-rolado={rolado}>
      <Container className="flex h-14 items-center gap-2 sm:h-16">
        <a
          href="#inicio"
          className="shrink-0 pr-2"
          aria-label="JGF Company, ir para o início"
        >
          <Logo />
        </a>

        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Navegação principal"
        >
          {nav.items.map((item) =>
            item.menu ? (
              /* O painel vive dentro do grupo, então pairar sobre ele conta
                 como pairar sobre o item e ele não se fecha no caminho. Abrir
                 é `:hover` e `:focus-within` no CSS, sem temporizador: não há
                 estado para desencontrar do cursor. */
              <div key={item.href} className="nav-grupo">
                <a
                  href={item.href}
                  className="nav-item"
                  data-ativo={ativa === item.href}
                  aria-current={ativa === item.href ? "true" : undefined}
                >
                  {item.label}
                  <ChevronDownIcon className="nav-seta" />
                </a>

                <div className="nav-painel">
                  <div className="nav-painel-card">
                    <ul>
                      {subitens(item.menu).map((sub) => (
                        <li key={sub.href}>
                          <a href={sub.href} className="nav-sub">
                            <span className="nav-sub-titulo">{sub.label}</span>
                            <span className="nav-sub-apoio">{sub.apoio}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="nav-item"
                data-ativo={ativa === item.href}
                aria-current={ativa === item.href ? "true" : undefined}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <a
            href="#contato"
            className="hidden rounded-pill bg-brand px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand-vivo sm:inline-flex"
          >
            {nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-9 w-9 place-items-center rounded-pill border border-border text-foreground transition-colors hover:bg-surface lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="h-[17px] w-[17px]"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Menu do celular: mesma barra, aberta para baixo. Sem cursor para
          pairar, os painéis viram itens que abrem no toque. */}
      <div id="menu-mobile" hidden={!open} className="nav-mobile lg:hidden">
        <Container>
          <nav
            className="flex flex-col gap-0.5 py-3"
            aria-label="Navegação (celular)"
          >
            {nav.items.map((item) =>
              item.menu ? (
                <div key={item.href}>
                  <button
                    type="button"
                    className="nav-item nav-item-mobile w-full"
                    aria-expanded={expandido === item.href}
                    data-ativo={ativa === item.href}
                    onClick={() =>
                      setExpandido((e) => (e === item.href ? null : item.href))
                    }
                  >
                    {item.label}
                    <ChevronDownIcon
                      className="nav-seta"
                      data-aberta={expandido === item.href}
                    />
                  </button>

                  <div
                    className="nav-sanfona"
                    data-aberta={expandido === item.href}
                  >
                    <div className="nav-sanfona-interna">
                      <ul className="py-1 pl-3">
                        {subitens(item.menu).map((sub) => (
                          <li key={sub.href}>
                            <a
                              href={sub.href}
                              onClick={fecharMenu}
                              className="nav-sub nav-sub-mobile"
                            >
                              <span className="nav-sub-titulo">
                                {sub.label}
                              </span>
                              <span className="nav-sub-apoio">{sub.apoio}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={fecharMenu}
                  className="nav-item nav-item-mobile"
                  data-ativo={ativa === item.href}
                >
                  {item.label}
                </a>
              ),
            )}

            <a
              href="#contato"
              onClick={fecharMenu}
              className="mt-2 rounded-card bg-brand px-5 py-3 text-center text-sm font-semibold text-background"
            >
              {nav.cta}
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
