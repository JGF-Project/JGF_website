"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Diz quando um elemento já entrou na tela — uma vez só, sem voltar atrás.
 *
 * Usado por `Reveal` e por `Stagger`, que revelam coisas diferentes a partir
 * da mesma pergunta.
 *
 * ## A rede de segurança
 *
 * Tudo que é revelado nasce em `opacity: 0`. Se o observador não responder,
 * o conteúdo não fica sem animação: fica invisível. E como praticamente toda
 * a página passa por aqui, seria a página inteira em branco.
 *
 * Isso não é hipótese: existem ambientes onde `IntersectionObserver` está
 * declarado mas nunca chama de volta — o painel de pré-visualização deste
 * projeto é um deles.
 *
 * A saída se apoia numa garantia da especificação: ao observar um elemento, o
 * observador dispara uma primeira vez logo em seguida, esteja ele visível ou
 * não. Então basta anotar se *alguma* resposta chegou. Se em um segundo não
 * veio nenhuma, o observador não está funcionando e o conteúdo aparece assim
 * mesmo. Quando ele funciona, a primeira resposta chega em milésimos e o
 * cronômetro é cancelado antes de qualquer coisa.
 *
 * `limiar` e `margem` são os mesmos parâmetros do `IntersectionObserver`.
 */
export function useRevelacao(limiar: number, margem: string) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sem observador não há o que esperar: revela na primeira folga. O
    // temporizador de zero não é adorno — revelar aqui dentro, direto, seria
    // mexer no estado durante o efeito.
    if (typeof IntersectionObserver === "undefined") {
      const agora = setTimeout(() => setVisivel(true), 0);
      return () => clearTimeout(agora);
    }

    let respondeu = false;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        respondeu = true;
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { threshold: limiar, rootMargin: margem },
    );

    observador.observe(el);

    const rede = setTimeout(() => {
      if (!respondeu) {
        setVisivel(true);
        observador.disconnect();
      }
    }, 1000);

    return () => {
      clearTimeout(rede);
      observador.disconnect();
    };
  }, [limiar, margem]);

  return { ref, visivel };
}
