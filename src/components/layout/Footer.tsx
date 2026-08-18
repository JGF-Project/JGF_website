import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { content } from "@/content";
import { site } from "@/lib/site";
import { InstagramIcon, MailIcon } from "@/components/ui/icons";

export function Footer() {
  const { footer, nav } = content;

  return (
    <footer className="relative mt-24 border-t border-border bg-surface/40">
      <Container>
        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo size="footer" />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {footer.tagline}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-sm font-semibold">{footer.navLabel}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">{footer.contactLabel}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm break-all text-muted transition-colors hover:text-brand"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0" />
                  {site.social.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.rights}</p>
          <p>{footer.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
