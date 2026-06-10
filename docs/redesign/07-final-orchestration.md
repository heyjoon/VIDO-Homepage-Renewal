# Final Orchestration Architecture

## Goal

Build toward planner / developer / QA multi-agent orchestration for the VIDO homepage renewal while keeping the current implementation safe and runnable.

## Current Executable Layer

```txt
agent/orchestrator
```

The current runner:

1. loads `agent/tasks/*.json`
2. selects a task through planner logic
3. builds a Developer Agent prompt
4. runs Codex CLI with `workspace-write`
5. builds a QA Reviewer prompt
6. runs Codex CLI with `read-only`
7. prints a JSON summary

## Final Target Layer

```txt
Agents SDK + Codex MCP
```

Target roles:

- Planner Agent: selects the next safe task and branch scope
- Developer Agent: implements exactly one task
- QA Reviewer Agent: reviews diff, checks commands, confirms visible result

## Adapter Boundary

The orchestrator uses an executor interface:

```txt
src/executors/executor.ts
```

Current implementation:

```txt
src/executors/codex-cli.ts
```

Future implementation:

```txt
src/executors/agents-sdk-adapter.ts
```

This keeps task selection, prompt construction, and QA policy independent from the runtime.

## First Real Run

Recommended first task:

```bash
cd agent/orchestrator
npm install
npm run build
node dist/index.js --dry-run --task H-002
node dist/index.js --task H-002
```

Why `H-002`:

- it is visible on the homepage
- it is lower risk than admin CRUD
- it tests product positioning and UI editing
- it can end with a visible route preview

## When To Move To Agents SDK

Move only after:

- at least one low-risk homepage task succeeds
- QA catches or confirms risk correctly
- the final answer always includes a visible result
- branch scope stays clean
- repeated `codex exec` runs are stable

## Non-Goals For The First Orchestrated Run

- no `/admin/users`
- no real permission system
- no destructive CRUD
- no production data mutations
- no broad full-site rewrite
