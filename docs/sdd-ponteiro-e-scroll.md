# SDD — Ponteiro e scroll

## Pedido

O ponteiro do sistema e a barra de rolagem destoam da folha. O pedido é trocar os dois por um desenho mais quieto, no mesmo papel, tinta e sangue de boi, sem mexer no miolo da página.

## Decisão

O scroll continua nativo. Só muda a pele: trilho na cor do chão, polegar fino em papel misturado com tinta, um pouco mais quente ao passar o mouse. Não há barra falsa por cima do conteúdo. No telefone o gesto de rolar segue o do sistema; a pele fina acompanha.

O ponteiro vira uma seta pequena, desenhada na página, com a ponta no clique. O preenchimento é a folha e o contorno é a tinta, para aparecer no chão escuro e nas chapas claras. Em cima de link ou botão a seta inverte: tinta por dentro, folha no contorno. Não há rastro, atraso nem crescimento.

Onde o sistema já explica o gesto, a seta sai de cena e volta o cursor nativo: campo de texto, controle desligado e retrato fechado (`.is-closed`). Toque, caneta e alto contraste também ficam com o cursor do sistema. A decisão olha o `pointerType` do evento, não a media query do aparelho: um mouse ligado num tablet entra, um dedo não. Sem JavaScript, links e botões continuam com `cursor: pointer`.

## Lógica

`src/lib/pointer.ts` decide, sem DOM, se o ponteiro da página entra e em qual estado. A entrada é um recorte do alvo (`textual`, `forbidden`, `interactive`) mais o tipo do evento e o `forced-colors`. Texto e proibido vencem o interativo. O componente só aplica essa resposta.

## Arquivos

- `src/lib/pointer.ts` — a decisão.
- `src/lib/pointer.test.ts` — a tabela, com o alvo mockado.
- `src/components/pointer/site-pointer.tsx` — segue o mouse e não renderiza de novo a cada movimento.
- `src/components/pointer/pointer.css` — a seta e a pele do scroll.
- `src/app/layout.tsx` — a seta entra uma vez, em todas as folhas.
- `src/app/globals.css` — sai o `scrollbar-color` antigo, para não brigar com a pele nova.

Abas, elenco, rotas e foco de teclado ficam. O contorno `:focus-visible` não muda.

## Interface

A seta tem 18px. Não cobre o clique (`pointer-events: none`) e o leitor de tela não a anuncia. O scroll tem 8px, canto pouco arredondado, sem as setas do navegador. O movimento da página que já existe respeita `prefers-reduced-motion`; a seta não anima. No telefone a coluna não muda: sem mouse, a seta nem liga.
