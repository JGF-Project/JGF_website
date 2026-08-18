import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Tech } from "@/components/sections/Tech";
import { Team } from "@/components/sections/Team";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Tech />
        <Team />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
