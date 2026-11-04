# Automação "Portifolio - Issue Resolver" ao criar issue

O Cursor **não** expõe hoje um trigger nativo de GitHub **Issue created** nas [Automations](https://cursor.com/docs/cloud-agent/automations). Os gatilhos de issue disponíveis são **Issue comment** e **Issue label changed**.

Para rodar a automação **Portifolio - Issue Resolver** sempre que alguém abrir uma issue em `L-0-W/portifolio`, use **Webhook** na automação + este workflow do GitHub Actions.

## 1. Configurar a automação no Cursor

1. Abra [cursor.com/automations](https://cursor.com/automations) e edite **Portifolio - Issue Resolver**.
2. Em **Triggers**, adicione **Webhook** (pode manter outros triggers se quiser).
3. Em **Repositories**, deixe **Single repository** → `L-0-W/portifolio` (branch `main`).
4. **Salve** a automação — só depois disso aparecem a URL do webhook e a API key.
5. Copie:
   - **POST to** (URL, ex.: `https://api2.cursor.sh/automations/webhook/...`)
   - **key** (valor `crsr_...`, sem "Bearer ")
6. No prompt da automação, inclua algo como:

   > Quando o payload do webhook tiver `event: github.issue.opened`, leia `issue.title`, `issue.body`, `issue.number` e `issue.html_url`. Analise o pedido, implemente no repositório portifolio e abra PR se fizer sentido.

## 2. Secrets no GitHub

Em **Settings → Secrets and variables → Actions** do repo `portifolio`:

| Secret | Valor |
|--------|--------|
| `CURSOR_AUTOMATION_WEBHOOK_URL` | URL "POST to" da automação |
| `CURSOR_AUTOMATION_WEBHOOK_KEY` | Apenas a key (`crsr_...`), **sem** quebra de linha no final |

Dica: ao colar a key, use `printf '%s' 'crsr_...'` ao criar o secret para evitar newline (causa HTTP 400).

## 3. Workflow

O arquivo `.github/workflows/cursor-issue-opened.yml` dispara em `issues: opened` e envia JSON com `event`, `issue`, `repository` e `sender`.

## Alternativa só no Cursor (sem webhook)

Se bastar reagir a **comentário** ou **mudança de label** na issue, você pode usar triggers GitHub nativos na mesma automação, com repositório `L-0-W/portifolio` — mas **não** dispara no momento em que a issue é criada, só depois do primeiro comentário ou label.
