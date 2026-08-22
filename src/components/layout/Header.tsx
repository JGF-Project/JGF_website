"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "./Logo";
import { content } from "@/content";

export function Header() {
  const { nav } = content;
  const [rolado, setRolado] = useState(false);
  const [open, setOpen] = useState(false);
  /** Seção visível no momento, para marcar o item correspondente. */
  const [ativa, setAtiva] = useState<string>("#inicio");

  useEffect(() => {
    const onScroll = () => setRolado(window.scrollY > 16);
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 sm:top-5">
      <Container>
        {/* A barra não encosta nas bordas da tela: é um componente que
            paira sobre a página, com largura própria. */}
        <div
          className="nav-float flex h-14 items-center gap-2 px-2.5 sm:h-16 sm:px-3"
          data-rolado={rolado}
        >
          <a
            href="#inicio"
            className="shrink-0 pr-1 pl-1.5"
            aria-label="JGF Company, ir para o início"
          >
            <Logo />
          </a>

          <nav
            className="ml-1 hidden items-center gap-0.5 lg:flex"
            aria-label="Navegação principal"
          >
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-item"
                data-ativo={ativa === item.href}
                aria-current={ativa === item.href ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
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
        </div>

        {/* Menu do celular: mesma linguagem, painel flutuante logo abaixo */}
        <div
          id="menu-mobile"
          hidden={!open}
          className="nav-float mt-2 !rounded-panel p-3 lg:hidden"
          data-rolado="true"
        >
          <nav
            className="flex flex-col gap-0.5"
            aria-label="Navegação (celular)"
          >
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="nav-item !rounded-card py-3 text-base"
                data-ativo={ativa === item.href}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-card bg-brand px-5 py-3 text-center text-sm font-semibold text-background"
            >
              {nav.cta}
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
