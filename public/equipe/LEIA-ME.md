# Fotos da equipe

Coloque as três fotos nesta pasta com **exatamente** estes nomes:

| Arquivo             | Pessoa     |
| ------------------- | ---------- |
| `guilherme.jpg`     | Guilherme  |
| `joao-lucas.jpg`    | João Lucas |
| `fabricio.jpg`      | Fabrício   |

## Como ativar as fotos no site

Abra `src/content/pt-BR.ts`, seção `team.members`, e troque o `photo: null` de
cada pessoa pelo caminho do arquivo:

```ts
photo: "/equipe/guilherme.jpg",
```

Assim que o caminho for preenchido, o card deixa de mostrar as iniciais e passa
a exibir a foto automaticamente.

## Recomendações para as fotos ficarem consistentes

Os três cards usam a proporção **4:5 (retrato)** com recorte centralizado.
Para os três ficarem visualmente iguais:

- **Proporção:** 4:5 (ex.: 1000 × 1250 px). O corte é automático, mas quanto
  mais perto dessa proporção, menos a imagem é cortada.
- **Enquadramento:** do peito para cima, rosto centralizado no terço superior.
- **Fundo:** de preferência o mesmo tipo de fundo nas três (parede lisa, fundo
  neutro ou desfocado). É o que mais pesa para o conjunto parecer profissional.
- **Iluminação:** luz vinda da frente, sem sombra forte no rosto. Perto de uma
  janela, de dia, resolve.
- **Formato:** `.jpg` com qualidade alta, ou `.webp`. Até ~500 KB por foto.
- **Enquadramento igual entre as três:** mesma distância da câmera e mesma
  altura, se possível. Foto tirada em pé, com o celular na altura dos olhos.
