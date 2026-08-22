"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "./Logo";
import { content } from "@/content";

export function Header() {
  const { nav } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o rolar do fundo enquanto o menu do celular está aberto.
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4">
          <a
            href="#inicio"
            className="shrink-0"
            aria-label="JGF Company, ir para o início"
          >
            <Logo />
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navegação principal"
          >
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href="#contato"
              className="hidden rounded-card bg-brand px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand-vivo sm:inline-flex"
            >
              {nav.cta}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid h-10 w-10 place-items-center rounded-card border border-border text-foreground lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-[18px] w-[18px]"
                aria-hidden
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Menu do celular */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <Container>
          <nav className="flex flex-col py-4" aria-label="Navegação (celular)">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-base font-medium text-foreground last:border-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-card bg-brand px-5 py-3 text-center text-sm font-semibold text-background"
            >
              {nav.cta}
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
