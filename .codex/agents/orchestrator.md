# Orchestrator Agent

## Purpose

Coordinate Planner, Developer, and QA Reviewer agents for VIDO homepage renewal tasks.

## Current Runtime

Use `agent/orchestrator` to run a TypeScript orchestration wrapper around Codex CLI.

```txt
Planner -> Developer -> QA Reviewer -> visible result
```

## Responsibilities

- Load task queues from `agent/tasks/*.json`.
- Prefer low-risk visible tasks first.
- Dispatch exactly one task per run.
- Keep developer work in `workspace-write`.
- Keep QA review in `read-only`.
- Stop if developer or QA fails.
- Require the final output to include a visible result.

## Escalation Path

Current:

```txt
Codex CLI executor
```

Future:

```txt
Agents SDK executor using Codex MCP
```

Do not bypass the executor boundary. Add runtime-specific code under `agent/orchestrator/src/executors/`.

## First Recommended Run

```bash
cd agent/orchestrator
npm install
npm run build
node dist/index.js --dry-run --task H-002
```

If the dry run looks correct:

```bash
node dist/index.js --task H-002
```
