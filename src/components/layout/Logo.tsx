import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Logo oficial da JGF Company.
 *
 * A arte já traz o nome escrito e os cantos arredondados com transparência
 * real, por isso não há texto ao lado nem borda aplicada por CSS.
 * Arquivo em `public/logo-jgf.png`.
 */
export function Logo({
  className = "",
  size = "header",
}: {
  className?: string;
  /** `header` acompanha a altura da barra; `footer` aparece maior. */
  size?: "header" | "footer";
}) {
  const dimensoes =
    size === "header" ? "h-11 w-11 sm:h-12 sm:w-12" : "h-16 w-16";

  return (
    <Image
      src="/logo-jgf.png"
      alt={site.name}
      // Renderiza no dobro do tamanho exibido para ficar nítida em telas retina.
      width={128}
      height={128}
      priority={size === "header"}
      className={`shrink-0 select-none ${dimensoes} ${className}`}
    />
  );
}
