# VIDO Agent Orchestrator

This is the execution scaffold for the final VIDO automation direction.

It starts with Codex CLI and keeps a clean adapter boundary for future Agents SDK + Codex MCP orchestration.

## Current Flow

```txt
Planner -> Developer Agent -> QA Reviewer Agent
```

Implementation today:

```txt
TypeScript runner -> codex exec -> scoped implementation -> read-only QA review
```

Future implementation:

```txt
Agents SDK -> Codex MCP tool/server -> planner / developer / QA handoffs
```

## Install

```bash
cd agent/orchestrator
npm install
npm run build
```

## Dry Run

Preview the selected task, generated developer prompt, and QA prompt without editing files:

```bash
npm run build
node dist/index.js --dry-run --task H-002
```

## Run One Task

From the repository root or `agent/orchestrator`:

```bash
cd agent/orchestrator
npm run orchestrate -- --task H-002
```

This runs:

1. Planner selection
2. Developer Agent through `codex exec --sandbox workspace-write`
3. QA Reviewer Agent through `codex exec --sandbox read-only`
4. JSON run summary

## Arguments

- `--task <TASK_ID>`: run a specific task from `agent/tasks/*.json`
- `--dry-run`: print prompts and commands without running Codex
- `--developer-only`: skip QA reviewer
- `--repo-root <path>`: override repository root

## Safety Defaults

- Planner prefers low-risk visible tasks.
- Developer runs with `workspace-write`.
- QA runs with `read-only`.
- Prompts require the final answer to include a visible result.
- `AgentsSdkExecutor` is isolated until the repo is configured for Agents SDK + Codex MCP.

## Why This Shape

The shared GPT recommendation was staged:

```txt
Now: Codex CLI + AGENTS.md + .codex/agents
Next: codex exec one task at a time
Later: TypeScript Codex SDK task runner
Final: Agents SDK + Codex MCP planner / developer / QA orchestration
```

This folder implements the middle bridge: a TypeScript task runner that can execute through Codex CLI today and later swap to Agents SDK through `src/executors/agents-sdk-adapter.ts`.
