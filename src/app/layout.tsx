import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { content } from "@/content";
import { site } from "@/lib/site";

// A referência usa GT Walsheim Pro (fonte paga). A Plus Jakarta Sans é a
// alternativa aberta mais próxima: geométrica, moderna e boa para títulos.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const monoCode = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
});

const { meta } = content;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: meta.title,
    template: `%s | ${site.name}`,
  },
  description: meta.description,
  keywords: [...meta.keywords],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  // Favicon e ícone de atalho saem da própria logo, sem arquivo duplicado.
  icons: {
    icon: "/logo-jgf.png",
    shortcut: "/logo-jgf.png",
    apple: "/logo-jgf.png",
  },
  openGraph: {
    type: "website",
    locale: content.locale,
    url: site.url,
    siteName: site.name,
    title: meta.title,
    description: meta.description,
    images: [{ url: "/logo-jgf.png", width: 128, height: 128, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070f" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={content.locale}
      suppressHydrationWarning
      className={`${jakarta.variable} ${monoCode.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
