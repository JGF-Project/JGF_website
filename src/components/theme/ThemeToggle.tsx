"use client";

import { useTheme } from "next-themes";

/**
 * Os dois ícones são renderizados e a troca acontece por CSS (`dark:`).
 * Assim o botão sai igual no servidor e no cliente — sem estado de "mounted"
 * e sem o cabeçalho piscar no primeiro carregamento.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Alternar entre tema claro e escuro"
      title="Alternar tema"
      className={`grid h-10 w-10 place-items-center rounded-card border border-border bg-surface text-foreground transition-colors hover:border-brand hover:text-brand ${className}`}
    >
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
      <MoonIcon className="h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
