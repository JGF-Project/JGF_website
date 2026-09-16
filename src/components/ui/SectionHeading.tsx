import { Stagger } from "./Stagger";

/**
 * Cabeçalho de seção.
 *
 * Os três pedaços entram em sequência — rótulo, título, texto de apoio — em
 * vez de o bloco inteiro aparecer de uma vez. Como quase toda seção do site
 * usa este cabeçalho, é daqui que vem boa parte da sensação de a página ir
 * se montando conforme desce.
 *
 * O passo é curto: são só três elementos próximos, e um intervalo longo
 * deixaria o título esperando pelo rótulo.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";

  return (
    <Stagger
      passo={110}
      className={`flex flex-col gap-5 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <span className="pill">{eyebrow}</span>

      <h2 className="text-3xl font-semibold text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`max-w-2xl text-base leading-relaxed text-muted text-pretty sm:text-lg ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </Stagger>
  );
}
