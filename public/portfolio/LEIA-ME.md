# Screenshots dos projetos

Coloque aqui os prints reais de cada projeto do portfólio.

| Arquivo               | Projeto          |
| --------------------- | ---------------- |
| `rr-barbearia.png`    | RR Barbearia     |
| `confirmai.png`       | confirmai        |
| `vlm-presentes.png`   | VLM Presentes    |
| `barber-daniels.png`  | Barber Daniel's  |

## Como ativar no site

Abra `src/content/pt-BR.ts`, seção `portfolio.projects`, e troque o
`screenshot: null` pelo caminho do arquivo:

```ts
screenshot: "/portfolio/rr-barbearia.png",
```

## Como tirar o print

- Abra o site no navegador em tela cheia, no computador.
- Largura recomendada: **1440 px** (ou 1920 px).
- Capture a **tela inicial inteira**, incluindo o topo com o menu.
- Salve em `.png` (mais nítido para interfaces) ou `.webp`.
- O card recorta a imagem a partir do topo, então o mais importante é que o
  começo da página apareça bem.

## Tecnologias do projeto

O campo `tech` da RR Barbearia está vazio de propósito — a lista de tecnologias
só aparece no card quando for preenchida com o que foi realmente usado:

```ts
tech: ["React", "Node.js", "PostgreSQL"],
```
