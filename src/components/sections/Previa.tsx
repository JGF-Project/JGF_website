"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger } from "@/components/ui/Stagger";
import { ArrowRightIcon, CheckIcon, MailIcon } from "@/components/ui/icons";
import { content } from "@/content";
import { site } from "@/lib/site";
import type { PreviaCampo } from "@/content/types";

type Respostas = Record<string, string>;

/**
 * Formulário de prévia, em etapas.
 *
 * As perguntas vêm do conteúdo, não da marcação: este componente só sabe
 * desenhar e conferir os tipos de campo. Acrescentar uma pergunta é editar
 * `pt-BR.ts`.
 *
 * O envio usa o mesmo canal que o resto do site já usa para contato — o
 * e-mail da empresa, por `mailto:` — em vez de introduzir um backend só para
 * isto. As respostas ficam no navegador de quem preenche até o momento do
 * envio; nada é gravado em servidor.
 */
export function Previa() {
  const { previa } = content;
  const etapas = previa.etapas;
  /** As etapas de perguntas mais a revisão. */
  const totalPassos = etapas.length + 1;
  /** Nomes exibidos na régua de etapas, incluindo a revisão no fim. */
  const nomesEtapas = [...etapas.map((e) => e.nome), previa.revisao.nome];

  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});
  const [erros, setErros] = useState<Respostas>({});
  const [enviado, setEnviado] = useState(false);

  const idBase = useId();
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);
  const primeiraRenderizacao = useRef(true);

  // Ao trocar de etapa, o foco vai para o título dela. Sem isso, quem navega
  // por teclado ou leitor de tela continuaria no botão antigo e não saberia
  // que a pergunta mudou. Não roda na montagem, senão roubaria o foco de quem
  // acabou de abrir a página.
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    tituloRef.current?.focus();
  }, [passo, enviado]);

  const naRevisao = passo === etapas.length;
  const etapaAtual = naRevisao ? null : etapas[passo];

  function responder(id: string, valor: string) {
    setRespostas((r) => ({ ...r, [id]: valor }));
    // O erro some assim que a pessoa mexe no campo: continuar apontando o
    // problema enquanto ela corrige é ruído.
    setErros((e) => (e[id] ? { ...e, [id]: "" } : e));
  }

  function conferirEtapa() {
    if (!etapaAtual) return true;

    const novos: Respostas = {};
    for (const campo of etapaAtual.campos) {
      if (!campoValido(campo, respostas[campo.id] ?? "")) {
        novos[campo.id] = campo.erro ?? "Confira este campo.";
      }
    }

    setErros(novos);

    const primeiroInvalido = Object.keys(novos)[0];
    if (primeiroInvalido) {
      document.getElementById(`${idBase}-${primeiroInvalido}`)?.focus();
      return false;
    }
    return true;
  }

  function aoEnviar(evento: React.FormEvent) {
    evento.preventDefault();

    if (!naRevisao) {
      if (conferirEtapa()) setPasso((p) => p + 1);
      return;
    }

    const corpo = [
      `Pedido de prévia pelo site — ${site.name}`,
      "",
      ...etapas.flatMap((etapa) => [
        `[${etapa.nome}]`,
        ...etapa.campos.map(
          (campo) =>
            `${campo.label}\n${
              respostas[campo.id]?.trim() || previa.revisao.naoInformado
            }`,
        ),
        "",
      ]),
    ].join("\n");

    const assunto = `Pedido de prévia — ${
      respostas.nome?.trim() || "novo contato"
    }`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      assunto,
    )}&body=${encodeURIComponent(corpo)}`;

    setEnviado(true);
  }

  function recomecar() {
    setRespostas({});
    setErros({});
    setPasso(0);
    setEnviado(false);
  }

  /**
   * O botão da coluna da esquerda leva ao formulário.
   *
   * No celular ele está logo abaixo; no desktop, ao lado. Em vez de um link
   * de âncora — que no desktop rolaria a página sem motivo, já que o painel
   * quase sempre já está visível — o foco vai direto para o primeiro campo.
   * Quem usa teclado ou leitor de tela chega exatamente onde precisa digitar.
   */
  function irParaFormulario() {
    const campo = painelRef.current?.querySelector<HTMLElement>(
      "input, select, textarea",
    );

    if (!campo) return;

    campo.focus();
    // `focus` sozinho já rola o necessário na maioria dos casos, mas de forma
    // abrupta; centralizar o painel deixa a etapa inteira à vista.
    painelRef.current?.scrollIntoView({ block: "center" });
  }

  return (
    <section id="previa" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        {/* Duas colunas: à esquerda o convite, à direita a ferramenta.
            O argumento e a ação ficam lado a lado, e o painel deixa de ser um
            bloco solto no meio da página — o fundo azul do site passa em
            volta dele e entre as duas colunas. */}
        <div className="previa-composicao">
          <Stagger passo={110} className="previa-convite">
            <h2 className="previa-vitrine-titulo">{previa.vitrine.titulo}</h2>

            <p className="previa-vitrine-texto">{previa.vitrine.descricao}</p>

            <ul className="previa-beneficios">
              {previa.vitrine.beneficios.map((beneficio) => (
                <li key={beneficio.titulo} className="previa-beneficio">
                  <span className="previa-beneficio-marca" aria-hidden>
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="previa-beneficio-titulo">
                      {beneficio.titulo}
                    </span>
                    <span className="previa-beneficio-texto">
                      {beneficio.descricao}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div>
              <button
                type="button"
                onClick={irParaFormulario}
                className="previa-botao previa-botao-principal"
              >
                {previa.vitrine.cta}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </Stagger>

          <Reveal className="previa-painel-area" delay={120}>
            <div ref={painelRef} className="previa-card">
              {enviado ? (
              <div className="previa-passo text-center">
                <span className="previa-selo" aria-hidden>
                  <CheckIcon className="h-6 w-6" />
                </span>

                <h2
                  ref={tituloRef}
                  tabIndex={-1}
                  className="previa-titulo mt-6 outline-none"
                >
                  {previa.sucesso.titulo}
                </h2>

                <p className="previa-apoio mx-auto mt-4 max-w-md">
                  {previa.sucesso.descricao}
                </p>

                <p className="previa-nota mx-auto mt-6 max-w-md">
                  {previa.sucesso.aviso}
                </p>

                <button
                  type="button"
                  onClick={recomecar}
                  className="previa-botao previa-botao-principal mt-8"
                >
                  {previa.sucesso.voltar}
                </button>
              </div>
            ) : (
              <>
                {/* Assinatura discreta, como o cabeçalho de uma ferramenta.
                    O título e o texto de apoio da seção agora vivem na coluna
                    da esquerda; repeti-los aqui seria dizer duas vezes a mesma
                    coisa a meio palmo de distância. */}
                <p className="previa-marca">{previa.marca}</p>

                {/* Régua de etapas. Mostra o caminho inteiro — não só onde a
                    pessoa está, mas quanto falta e o que vem pela frente.
                    A lista é decorativa para quem usa leitor de tela: o
                    `progressbar` logo abaixo já anuncia etapa e total, e
                    repetir os quatro nomes a cada troca seria ruído. */}
                <ol className="previa-regua" aria-hidden>
                  {nomesEtapas.map((nome, i) => (
                    <li
                      key={nome}
                      className="previa-regua-item"
                      data-estado={
                        i === passo ? "atual" : i < passo ? "feita" : "futura"
                      }
                    >
                      <span className="previa-regua-numero">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="previa-regua-nome">{nome}</span>
                    </li>
                  ))}
                </ol>

                <div
                  className="previa-progresso"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={totalPassos}
                  aria-valuenow={passo + 1}
                  aria-label={previa.progressoLabel
                    .replace("{atual}", String(passo + 1))
                    .replace("{total}", String(totalPassos))}
                >
                  <span
                    className="previa-progresso-avanco"
                    style={{
                      transform: `scaleX(${(passo + 1) / totalPassos})`,
                    }}
                  />
                </div>

                <form onSubmit={aoEnviar} noValidate>
                  {/* A chave troca a cada etapa, então o bloco é remontado e a
                      animação de entrada roda de novo. */}
                  <div key={passo} className="previa-passo mt-8">
                    {etapaAtual ? (
                      <>
                        <h3
                          ref={tituloRef}
                          tabIndex={-1}
                          className="previa-pergunta outline-none"
                        >
                          {etapaAtual.titulo}
                        </h3>

                        <div className="mt-7 flex flex-col gap-6">
                          {etapaAtual.campos.map((campo) => (
                            <Campo
                              key={campo.id}
                              campo={campo}
                              idBase={idBase}
                              valor={respostas[campo.id] ?? ""}
                              erro={erros[campo.id]}
                              onChange={responder}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3
                          ref={tituloRef}
                          tabIndex={-1}
                          className="previa-pergunta outline-none"
                        >
                          {previa.revisao.titulo}
                        </h3>
                        <p className="previa-apoio mt-3">
                          {previa.revisao.subtitle}
                        </p>

                        <div className="mt-7 flex flex-col gap-4">
                          {etapas.map((etapa, i) => (
                            <div key={etapa.id} className="previa-resumo">
                              <div className="previa-resumo-topo">
                                <span className="previa-resumo-nome">
                                  {etapa.nome}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setPasso(i)}
                                  className="previa-editar"
                                >
                                  {previa.revisao.editar}
                                  <span className="sr-only">
                                    {` ${etapa.nome}`}
                                  </span>
                                </button>
                              </div>

                              <dl className="previa-resumo-lista">
                                {etapa.campos.map((campo) => {
                                  const valor = respostas[campo.id]?.trim();
                                  return (
                                    <div key={campo.id}>
                                      <dt>{campo.label}</dt>
                                      <dd data-vazio={!valor}>
                                        {valor || previa.revisao.naoInformado}
                                      </dd>
                                    </div>
                                  );
                                })}
                              </dl>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="previa-acoes mt-9">
                    {passo > 0 && (
                      <button
                        type="button"
                        onClick={() => setPasso((p) => p - 1)}
                        className="previa-botao previa-botao-secundario"
                      >
                        <ArrowRightIcon className="h-4 w-4 rotate-180" />
                        {previa.voltar}
                      </button>
                    )}

                    <button
                      type="submit"
                      className="previa-botao previa-botao-principal"
                    >
                      {naRevisao ? (
                        <>
                          <MailIcon className="h-[18px] w-[18px]" />
                          {previa.revisao.enviar}
                        </>
                      ) : (
                        previa.continuar
                      )}
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------
   Um campo, desenhado conforme o tipo declarado no conteúdo.
   --------------------------------------------------------------- */
function Campo({
  campo,
  idBase,
  valor,
  erro,
  onChange,
}: {
  campo: PreviaCampo;
  idBase: string;
  valor: string;
  erro?: string;
  onChange: (id: string, valor: string) => void;
}) {
  const id = `${idBase}-${campo.id}`;
  const idErro = `${id}-erro`;
  const invalido = Boolean(erro);

  const comuns = {
    id,
    name: campo.id,
    "aria-invalid": invalido || undefined,
    "aria-describedby": invalido ? idErro : undefined,
    className: "previa-campo",
    "data-erro": invalido || undefined,
  };

  return (
    <div>
      <label htmlFor={id} className="previa-rotulo">
        {campo.label}
        {!campo.obrigatorio && (
          <span className="previa-opcional"> (opcional)</span>
        )}
      </label>

      <div className="mt-2.5">
        {campo.tipo === "textarea" && (
          <textarea
            {...comuns}
            rows={campo.linhas ?? 4}
            placeholder={campo.placeholder}
            value={valor}
            onChange={(e) => onChange(campo.id, e.target.value)}
          />
        )}

        {campo.tipo === "selecao" && (
          <select
            {...comuns}
            value={valor}
            onChange={(e) => onChange(campo.id, e.target.value)}
            data-vazio={!valor || undefined}
          >
            <option value="">Selecione...</option>
            {campo.opcoes?.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        )}

        {campo.tipo === "opcoes" && (
          // Rádios de verdade por baixo: setas do teclado, leitor de tela e
          // agrupamento saem de graça. O visual é só o rótulo.
          <div
            className="previa-opcoes"
            role="radiogroup"
            aria-labelledby={`${id}-rotulo`}
            aria-invalid={invalido || undefined}
            aria-describedby={invalido ? idErro : undefined}
          >
            {campo.opcoes?.map((opcao, i) => (
              <label key={opcao} className="previa-opcao">
                <input
                  type="radio"
                  name={campo.id}
                  value={opcao}
                  id={i === 0 ? id : undefined}
                  checked={valor === opcao}
                  onChange={() => onChange(campo.id, opcao)}
                />
                <span>{opcao}</span>
              </label>
            ))}
          </div>
        )}

        {(campo.tipo === "texto" ||
          campo.tipo === "email" ||
          campo.tipo === "telefone") && (
          <input
            {...comuns}
            type={
              campo.tipo === "email"
                ? "email"
                : campo.tipo === "telefone"
                  ? "tel"
                  : "text"
            }
            inputMode={campo.tipo === "telefone" ? "tel" : undefined}
            autoComplete={
              campo.tipo === "email"
                ? "email"
                : campo.tipo === "telefone"
                  ? "tel"
                  : campo.id === "nome"
                    ? "name"
                    : undefined
            }
            placeholder={campo.placeholder}
            value={valor}
            onChange={(e) =>
              onChange(
                campo.id,
                campo.tipo === "telefone"
                  ? formatarTelefone(e.target.value)
                  : e.target.value,
              )
            }
          />
        )}
      </div>

      {invalido && (
        <p id={idErro} className="previa-erro" role="alert">
          {erro}
        </p>
      )}
    </div>
  );
}

/** Vai formatando enquanto a pessoa digita, sem nunca passar de 11 dígitos. */
function formatarTelefone(bruto: string) {
  const d = bruto.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function campoValido(campo: PreviaCampo, valor: string) {
  const v = valor.trim();

  if (!campo.obrigatorio) return true;
  if (!v) return false;

  if (campo.tipo === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  if (campo.tipo === "telefone") {
    const digitos = v.replace(/\D/g, "").length;
    return digitos === 10 || digitos === 11;
  }

  return v.length >= 2;
}
