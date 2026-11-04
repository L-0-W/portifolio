# Automação "Portifólio - Issue resolver" ao criar issue

O Cursor **não** expõe hoje um trigger nativo de GitHub **Issue created** nas [Automations](https://cursor.com/docs/cloud-agent/automations).

Para rodar a automação ao abrir uma issue em `L-0-W/portifolio`, use **Webhook** na automação + o workflow `.github/workflows/cursor-issue-opened.yml`.

## Secrets no GitHub

Em **Settings → Secrets and variables → Actions**:

| Secret | Valor |
|--------|--------|
| `CURSOR_AUTOMATION_WEBHOOK_URL` | URL "POST to" da automação (painel Webhook) |
| `CURSOR_AUTOMATION_WEBHOOK_KEY` | Key `crsr_...` **sem** "Bearer " e **sem** newline no final |

## Automação no Cursor

1. [Portifólio - Issue resolver](https://cursor.com/automations/3b3cc44c-ccbb-11f1-bec7-b2318963e0b6) — trigger **Webhook** ativo.
2. Repositório: `L-0-W/portifolio` / `main`.
3. No prompt, trate payloads com `event: "github.issue.opened"` e use `issue.title`, `issue.body`, `issue.number`, `issue.html_url`.

Se a key vazar, regenere no painel da automação e atualize o secret no GitHub.
