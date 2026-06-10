# VIDO Automation Roadmap

## What The Shared GPT Recommendation Means

The recommended path is staged automation, not immediate full autonomy.

## Stage 1: Current MVP

```txt
Codex CLI + AGENTS.md + .codex/agents
```

Goal:

```txt
One page is safely analyzed -> modified -> tested -> reviewed -> shown
```

This proves whether Codex can handle VIDO page renewal work without drifting into unrelated code.

Recommended first target:

- homepage section
- user dashboard summary
- awards listing card section

Avoid as the first target:

- `/admin/users`
- auth/permissions
- destructive CRUD
- production data mutation

## Stage 2: One Task At A Time

```txt
codex exec
```

Use explicit prompts:

- `agent/prompts/04-run-page-renewal-mvp.md`
- `agent/prompts/02-run-one-task.md`
- `agent/prompts/03-review-diff.md`

Each run should finish one task and show the result.

## Stage 3: TypeScript Task Runner

Implemented under:

```txt
agent/orchestrator
```

The runner reads `agent/tasks/*.json` and launches Codex on one task at a time.

It tracks:

- task id
- branch
- generated developer prompt
- generated QA prompt
- command used
- developer result
- QA reviewer result

Run:

```bash
cd agent/orchestrator
npm install
npm run build
node dist/index.js --dry-run --task H-002
```

## Stage 4: Multi-Agent Orchestration

Target:

```txt
Agents SDK + Codex MCP
```

Roles:

- Planner: selects the next safe task
- Developer: implements one task
- QA: checks diff, commands, and preview

Adapter boundary prepared under:

```txt
agent/orchestrator/src/executors/agents-sdk-adapter.ts
```

Only move the runtime to Agents SDK + Codex MCP after Stage 1 and Stage 2 are reliable.

## Definition Of Done For Any Automation Run

- one clear target route or section
- scoped code change
- checks run or explained
- QA/self-review included
- visible result provided
- next recommended task identified
