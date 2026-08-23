"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { HeroApoio } from "./HeroApoio";
import { content } from "@/content";

/** Tempo que cada projeto fica em cena antes da próxima troca. */
const INTERVALO_MS = 4000;

/**
 * Hero de tela cheia.
 *
 * Dois comportamentos independentes convivem aqui, e nenhum interfere no
 * outro:
 *
 * A) o carrossel roda pelo relógio — um `setInterval` avança o índice a cada
 *    4 segundos e o crossfade acontece por transição de CSS;
 * B) a redução roda pela rolagem — um laço de `requestAnimationFrame` escreve
 *    a progressão em `--p` na seção, e largura, altura e canto do quadro saem
 *    dela por `calc()`.
 *
 * O cabeçalho fica fora desta seção, em `page.tsx`. Ele não é ancestral nem
 * descendente do que encolhe, então não escala, não some e não sai do lugar.
 */
export function HeroVisual() {
  const { hero, portfolio } = content;

  // Só entram no rodízio os projetos que já têm arte panorâmica. Assim que a
  // VLM Presentes ganhar a dela, ela volta sozinha, sem mexer aqui.
  const telas = portfolio.projects.flatMap((projeto) =>
    projeto.banner
      ? [
          {
            id: projeto.id,
            banner: projeto.banner,
            alt: `${projeto.name} — ${projeto.category}`,
          },
        ]
      : [],
  );
  const total = telas.length;

  const [ativo, setAtivo] = useState(0);
  const palcoRef = useRef<HTMLElement>(null);

  // --- ANIMAÇÃO A: carrossel, pelo tempo ---
  useEffect(() => {
    if (total < 2) return;

    // Atualização por função: o intervalo é criado uma vez só e mesmo assim
    // nunca lê um índice velho. As dependências são estáveis, então não há
    // um segundo intervalo nascendo a cada render.
    const id = setInterval(() => {
      setAtivo((i) => (i + 1) % total);
    }, INTERVALO_MS);

    return () => clearInterval(id);
  }, [total]);

  // --- ANIMAÇÃO B: redução, pela rolagem ---
  useProgressoDeRolagem(palcoRef);

  // A figura que sai continua opaca por baixo enquanto a que entra aparece.
  // Como o carrossel só avança, a anterior é sempre a de índice imediatamente
  // abaixo — não precisa virar estado.
  const anterior = (ativo - 1 + total) % total;

  return (
    <section id="inicio" className="hero-palco" ref={palcoRef}>
      <div className="hero-fixo">
        <div className="hero-quadro">
          <div className="hero-telas">
            {telas.map((tela, i) => (
              <figure
                key={tela.id}
                className="hero-tela"
                data-ativo={i === ativo}
                data-anterior={i === anterior}
              >
                <Image
                  src={tela.banner}
                  alt={tela.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="hero-imagem"
                />
              </figure>
            ))}
          </div>

          {/* Véu discreto, mais forte só onde o texto encosta */}
          <div className="hero-veu" aria-hidden />

          {/* Texto fixo: só a imagem atrás dele muda */}
          <div className="hero-legenda">
            <p className="hero-olho">{hero.badge}</p>
            <h1 className="hero-titulo">
              {hero.title}
              {/* Quebra proposital a partir do tablet; no celular o texto flui */}
              <br className="hidden sm:block" /> {hero.titleHighlight}
            </h1>
          </div>
        </div>

        {/* Entra à direita conforme o quadro abre espaço. Abaixo de lg fica em
            display none e o mesmo conteúdo vira seção, logo depois do hero. */}
        <div className="hero-texto">
          <HeroApoio compacto />
        </div>
      </div>
    </section>
  );
}

/**
 * Liga a posição da rolagem à progressão `--p`, de 0 a 1.
 *
 * O listener de scroll não calcula nada: só acorda o laço de animação. É o
 * laço que lê a posição, e ele relê a cada quadro — nada fica guardado de uma
 * medição antiga, então mudança de altura de tela, barra de endereço do
 * celular ou imagem que terminou de carregar se corrigem sozinhas no quadro
 * seguinte.
 *
 * O valor caminha até o alvo por interpolação, o que tira a aspereza da roda
 * do mouse sem atrasar a resposta de forma perceptível, e o laço para assim
 * que alcança o alvo. Nada disso passa por estado do React: a página não
 * re-renderiza durante a rolagem, só uma propriedade customizada muda.
 */
function useProgressoDeRolagem(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const palco = ref.current;
    const fixo = palco?.firstElementChild as HTMLElement | null;
    if (!palco || !fixo) return;

    let atual = 0;
    let quadro = 0;
    let rodando = false;
    let avancado = false;

    /**
     * A corrida é a distância em que o sticky segura o quadro, medida no DOM
     * em vez de repetida como número mágico. Enquanto ela não existir — layout
     * ainda não aplicado — a progressão é 0: é melhor abrir sem encolhimento e
     * corrigir no quadro seguinte do que abrir com o hero já reduzido.
     */
    const medirAlvo = () => {
      const corrida = palco.offsetHeight - fixo.offsetHeight;
      if (corrida <= 0) return 0;

      const andado = -palco.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, andado / corrida));
    };

    const passo = () => {
      const alvo = medirAlvo();
      // Aproximação por fração: o valor persegue a posição da rolagem em vez
      // de saltar para ela, o que tira a aspereza de cada giro da roda.
      atual += (alvo - atual) * 0.15;

      if (Math.abs(alvo - atual) < 0.0004) {
        atual = alvo;
        rodando = false;
      } else {
        quadro = requestAnimationFrame(passo);
      }

      palco.style.setProperty("--p", atual.toFixed(4));

      // O texto da direita só fica clicável depois de aparecer. Escrito apenas
      // na virada, não a cada quadro, para não sujar o DOM à toa.
      const agora = atual > 0.6;
      if (agora !== avancado) {
        avancado = agora;
        palco.dataset.avancado = String(agora);
      }
    };

    const acordar = () => {
      if (rodando) return;
      rodando = true;
      quadro = requestAnimationFrame(passo);
    };

    atual = medirAlvo();
    palco.style.setProperty("--p", atual.toFixed(4));

    window.addEventListener("scroll", acordar, { passive: true });
    window.addEventListener("resize", acordar, { passive: true });

    // Acorda o laço quando a própria seção muda de tamanho, o que cobre o
    // primeiro layout e a barra de endereço aparecendo no celular.
    const observador = new ResizeObserver(acordar);
    observador.observe(palco);

    return () => {
      cancelAnimationFrame(quadro);
      observador.disconnect();
      window.removeEventListener("scroll", acordar);
      window.removeEventListener("resize", acordar);
      palco.style.removeProperty("--p");
      delete palco.dataset.avancado;
    };
  }, [ref]);
}
