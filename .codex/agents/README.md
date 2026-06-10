# .codex/agents

This directory stores agent operating profiles for the VIDO homepage renewal automation.

## Current MVP

Use Codex CLI with:

- `AGENTS.md` for durable repository rules
- `.codex/agents/page-renewal-worker.md` for the first implementation agent
- `.codex/agents/qa-reviewer.md` for review and verification behavior
- `.codex/agents/orchestrator.md` for planner/developer/QA coordination
- `agent/prompts/*.md` for explicit `codex exec` prompts
- `agent/orchestrator` for the TypeScript runner

The MVP agent does one page or one section at a time:

```txt
analyze -> modify -> test/build -> review summary -> show result
```

The orchestrated runner does:

```txt
Planner -> Developer -> QA Reviewer -> JSON summary
```

## Recommended First Targets

Start with low-risk visible surfaces before admin CRUD:

1. Homepage section renewal
2. User dashboard summary panel
3. Awards listing card behavior
4. Upload-to-awards bridge section

Avoid starting with high-risk admin pages such as `/admin/users`, permissions, destructive CRUD, billing, or production data workflows.

## Future Stages

1. Current: Codex CLI + `AGENTS.md` + `.codex/agents`
2. Next: `codex exec` runs one task at a time
3. Now scaffolded: TypeScript task runner under `agent/orchestrator`
4. Final target: Agents SDK + Codex MCP orchestration for planner / developer / QA multi-agent flows
