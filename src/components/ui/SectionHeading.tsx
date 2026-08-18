import { Reveal } from "./Reveal";

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
    <Reveal
      className={`flex flex-col gap-5 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {/* Rótulo em pílula, assinatura da referência */}
      <span className="pill text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        {eyebrow}
      </span>

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
    </Reveal>
  );
}
