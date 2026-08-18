# JGF Company — site institucional

Site oficial da JGF Company, criado com Next.js (App Router), TypeScript e
Tailwind CSS v4. Tema claro e escuro com alternador, conteúdo separado do
código e estrutura preparada para receber outros idiomas.

## Rodar o projeto

```bash
npm install
```

```bash
npm run dev
```

Abra <http://localhost:3000>.

Outros comandos:

| Comando         | O que faz                             |
| --------------- | ------------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento           |
| `npm run build` | Build de produção                     |
| `npm start`     | Roda o build de produção localmente   |
| `npm run lint`  | Verifica o código com o ESLint        |

## Onde mexer no conteúdo

**Toda a escrita do site está em um arquivo só:**

```
src/content/pt-BR.ts
```

Textos, serviços, etapas do processo, projetos do portfólio, tecnologias,
equipe e FAQ — tudo ali. Nenhum texto está preso dentro dos componentes.

Dados fixos da empresa (nome, e-mail, Instagram, domínio) ficam em:

```
src/lib/site.ts
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx          moldura do site, metadados e provedor de tema
│   ├── page.tsx            a página única, montando as seções em ordem
│   ├── globals.css         design system: cores, tema claro/escuro, animações
│   ├── icon.tsx            favicon gerado a partir da marca
│   ├── robots.ts           robots.txt
│   └── sitemap.ts          sitemap.xml
├── content/
│   ├── types.ts            contrato de conteúdo (usado por qualquer idioma)
│   ├── pt-BR.ts            ← todo o texto do site
│   └── index.ts            registro de idiomas
├── components/
│   ├── layout/             cabeçalho, rodapé e logo
│   ├── sections/           Hero, Serviços, Processo, Portfólio, Tecnologias,
│   │                       Equipe, FAQ e Contato
│   ├── theme/              alternador de tema claro/escuro
│   ├── seo/                dados estruturados (schema.org)
│   └── ui/                 peças reutilizáveis e ícones
└── lib/site.ts             dados fixos da empresa
public/
├── equipe/                 fotos dos três fundadores (ver LEIA-ME.md)
└── portfolio/              screenshots dos projetos (ver LEIA-ME.md)
```

## Pendências de conteúdo

| O que falta                          | Onde entra                                    |
| ------------------------------------ | --------------------------------------------- |
| Fotos de Guilherme, João Lucas e Fabrício | `public/equipe/` + campo `photo` em `pt-BR.ts` |
| Screenshot da RR Barbearia           | `public/portfolio/` + campo `screenshot`      |
| Tecnologias usadas na RR Barbearia   | campo `tech` do projeto em `pt-BR.ts`         |
| Segundo projeto de barbearia         | segundo item de `portfolio.projects`          |
| Domínio definitivo                   | `url` em `src/lib/site.ts`                    |

Cada pasta em `public/` tem um `LEIA-ME.md` com o passo a passo e as
recomendações de formato das imagens.

## Adicionar inglês no futuro

A estrutura já está pronta para isso e nenhum componente precisa mudar:

1. crie `src/content/en.ts` exportando um objeto que satisfaça `SiteContent`;
2. registre-o em `locales`, dentro de `src/content/index.ts`;
3. transforme a raiz em `src/app/[locale]/` e passe o idioma para `getContent()`.

## Publicar

O projeto está pronto para a Vercel: suba o repositório para o GitHub, importe
em <https://vercel.com/new> e a plataforma detecta o Next.js automaticamente.
Antes de publicar, troque `url` em `src/lib/site.ts` pelo domínio real — ele é
usado nos metadados, no `sitemap.xml` e no `robots.txt`.
