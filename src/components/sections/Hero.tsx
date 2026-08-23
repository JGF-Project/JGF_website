import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroApoio } from "./HeroApoio";

/**
 * Texto de apoio do hero em telas estreitas.
 *
 * A partir de `lg` este bloco some: ali o mesmo conteúdo aparece dentro do
 * palco do hero, ao lado do quadro reduzido. Abaixo disso não há largura para
 * pôr texto ao lado da imagem, então ele volta a ser uma seção comum.
 */
export function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:hidden">
      <Container>
        <Reveal>
          <HeroApoio />
        </Reveal>
      </Container>
    </section>
  );
}
