/**
 * Dados fixos da empresa.
 * Alterar aqui reflete em todo o site (header, footer, contato e metadados).
 */
export const site = {
  name: "JGF Company",
  shortName: "JGF",
  /**
   * Endereço público do site. Usado nos metadados, no canonical, no
   * sitemap.xml e no robots.txt. Trocar quando o domínio próprio for
   * registrado e apontado para a Vercel.
   */
  url: "https://jgf-company.vercel.app",
  email: "jgfcompanyfr@gmail.com",
  social: {
    instagram: {
      label: "Instagram",
      handle: "@jgfcompany",
      href: "https://instagram.com/jgfcompany",
    },
  },
} as const;

export type Site = typeof site;
