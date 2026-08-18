import type { SiteContent } from "./types";
import { ptBR } from "./pt-BR";

/**
 * Idiomas disponíveis no site.
 *
 * Para adicionar inglês no futuro:
 *   1. criar `src/content/en.ts` exportando um objeto `SiteContent`;
 *   2. registrá-lo em `locales` abaixo;
 *   3. trocar `defaultLocale` ou transformar a raiz em `src/app/[locale]/`.
 * Nenhum componente precisa ser alterado — todos leem daqui.
 */
export const locales = {
  "pt-BR": ptBR,
} satisfies Record<string, SiteContent>;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "pt-BR";

export function getContent(locale: Locale = defaultLocale): SiteContent {
  return locales[locale];
}

/** Atalho para o conteúdo do idioma padrão. */
export const content = getContent();

export type { SiteContent } from "./types";
