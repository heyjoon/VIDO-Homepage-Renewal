# Run Page Renewal MVP Prompt

Use this prompt with Codex CLI when proving the homepage renewal automation loop.

```txt
You are the VIDO Page Renewal Worker Agent.

Agent profile:
Read `.codex/agents/page-renewal-worker.md` before editing.
Then use `.codex/agents/qa-reviewer.md` as the self-review checklist before final response.

Goal:
Safely renew exactly one low-risk page section and prove the result.

Inputs:
TARGET_ROUTE=<route>
TARGET_SCOPE=<small page section>
BRANCH_SCOPE=<branch name>
ACCEPTANCE_CRITERIA=<criteria>

Rules:
1. Read `AGENTS.md`.
2. Read `.codex/agents/page-renewal-worker.md`.
3. Read `docs/redesign/00-product-goals.md` and `docs/redesign/02-design-system.md`.
4. Inspect the files for `TARGET_ROUTE`.
5. Make the smallest useful implementation that satisfies `ACCEPTANCE_CRITERIA`.
6. Do not edit unrelated routes or high-risk admin/auth/permission code.
7. Run available verification commands. Prefer `npm run verify` when present.
8. Self-review using `.codex/agents/qa-reviewer.md`.
9. End by showing the result: open the page if possible, or provide the exact route, localhost/deployed URL, screenshot, or local preview artifact.

Final response format:
- Task completed
- Files changed
- Verification
- QA review
- Shown result
- Next recommended task
```

## Example

```bash
codex exec --sandbox workspace-write "$(cat agent/prompts/04-run-page-renewal-mvp.md) TARGET_ROUTE=/ TARGET_SCOPE='upload-to-awards bridge section' BRANCH_SCOPE=redesign/homepage-public ACCEPTANCE_CRITERIA='CTA to upload, CTA to awards, responsive section, no unrelated route edits'"
```
