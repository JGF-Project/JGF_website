import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroApoio } from "./HeroApoio";

/**
 * Texto de apoio do hero.
 *
 * Já morou dentro do palco do hero, aparecendo à direita conforme a imagem
 * encolhia. Com a faixa de abertura passando a ter altura fixa, não há mais
 * espaço se abrindo ao lado dela, e este bloco voltou a ser uma seção comum,
 * logo depois da faixa.
 */
export function Hero() {
  return (
    <section className="pt-14 pb-16 sm:pt-16 sm:pb-20">
      <Container>
        <Reveal>
          <HeroApoio />
        </Reveal>
      </Container>
    </section>
  );
}
