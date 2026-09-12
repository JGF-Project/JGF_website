import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { Hero } from "@/components/sections/Hero";
import { Previa } from "@/components/sections/Previa";
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

      {/* O cabeçalho é fixo, então ele não ocupa espaço no fluxo. O recuo aqui
          devolve exatamente a faixa que ele cobre — 0.75rem de folga mais
          3.5rem de altura no celular, 1rem mais 4rem a partir de sm, e um
          respiro igual embaixo — para a imagem do carrossel começar abaixo da
          barra em vez de passar por trás dela. */}
      <main id="conteudo" className="flex-1 pt-20 sm:pt-24">
        {/* Serviços sobe para logo depois da faixa de abertura: é o encaixe
            da referência, em que a fileira de cards aparece grudada no
            carrossel, antes de qualquer bloco longo de texto. */}
        <HeroVisual />
        <Services />
        <Hero />
        <Previa />
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
