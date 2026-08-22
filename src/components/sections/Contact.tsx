"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  InstagramIcon,
  MailIcon,
} from "@/components/ui/icons";
import { content } from "@/content";
import { site } from "@/lib/site";

export function Contact() {
  const { contact } = content;
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sem acesso à área de transferência: o e-mail continua visível na tela.
    }
  }

  return (
    <section id="contato" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="panel noise px-6 py-14 sm:px-12 sm:py-20">
            <div className="relative flex flex-col items-center text-center">
              <span className="pill">{contact.eyebrow}</span>

              <h2 className="mt-6 max-w-2xl text-3xl font-semibold text-balance sm:text-5xl sm:leading-[1.08]">
                {contact.title}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
                {contact.subtitle}
              </p>

              <div className="mt-10 flex w-full max-w-md flex-col gap-3">
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    "Quero um orçamento com a JGF Company",
                  )}`}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-card bg-brand px-7 py-4 text-sm font-semibold text-background transition-colors hover:bg-brand-vivo"
                >
                  <MailIcon className="h-[18px] w-[18px]" />
                  {contact.emailCta}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  aria-live="polite"
                  className="pill justify-center px-7 py-4 text-sm font-medium break-all text-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-4 w-4 shrink-0 text-brand" />
                      {contact.copiedLabel}
                    </>
                  ) : (
                    <>
                      <CopyIcon className="h-4 w-4 shrink-0" />
                      {site.email}
                    </>
                  )}
                </button>
              </div>

              <div className="mt-10 flex flex-col items-center gap-3">
                <span className="text-xs font-medium tracking-widest text-muted uppercase">
                  {contact.socialLabel}
                </span>
                <a
                  href={site.social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                >
                  <InstagramIcon className="h-[18px] w-[18px]" />
                  {site.social.instagram.handle}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
