# VIDO Redesign Agent Runner Guide

This folder contains explicit prompts, task queues, and a TypeScript orchestrator for using Codex as a supervised redesign automation agent.

## Correct Mental Model

The first MVP is not a full autonomous website builder.

The first MVP is:

```txt
Codex analyzes one page safely
-> modifies one small scope
-> runs checks
-> reviews the diff
-> shows the result
```

Use this to prove reliability before expanding into admin CRUD, permissions, auth, or production-like data workflows.

## Current Recommended Stack

```txt
Codex CLI + AGENTS.md + .codex/agents + agent/orchestrator
```

Use:

- `AGENTS.md` for durable repository-wide rules
- `.codex/agents/page-renewal-worker.md` for implementation behavior
- `.codex/agents/qa-reviewer.md` for verification and review behavior
- `.codex/agents/orchestrator.md` for planner/developer/QA coordination behavior
- `agent/prompts/04-run-page-renewal-mvp.md` for the first `codex exec` MVP loop
- `agent/orchestrator` for the TypeScript planner -> developer -> QA runner

## Recommended Start

After app code exists in the repository, run inventory first:

```bash
codex exec --sandbox workspace-write "$(cat agent/prompts/00-inventory.md)"
```

Then create or refresh task breakdown:

```bash
codex exec --sandbox workspace-write "$(cat agent/prompts/01-create-task-breakdown.md)"
```

Then prove the MVP loop on a low-risk page section:

```bash
codex exec --sandbox workspace-write "$(cat agent/prompts/04-run-page-renewal-mvp.md) TARGET_ROUTE=/ TARGET_SCOPE='upload-to-awards bridge section' BRANCH_SCOPE=redesign/homepage-public ACCEPTANCE_CRITERIA='CTA to upload, CTA to awards, responsive section, no unrelated route edits'"
```

## Orchestrated Run

Use the TypeScript runner when you want planner -> developer -> QA in one command:

```bash
cd agent/orchestrator
npm install
npm run build
node dist/index.js --dry-run --task H-002
node dist/index.js --task H-002
```

Review the branch diff separately when needed:

```bash
codex exec --sandbox read-only "$(cat agent/prompts/03-review-diff.md)"
```

## Manual Interactive Flow

If you are using Codex interactively, paste:

```txt
Read AGENTS.md, then read .codex/agents/page-renewal-worker.md. Run agent/prompts/04-run-page-renewal-mvp.md with TARGET_ROUTE=/ and TARGET_SCOPE='homepage bridge section'.
```

## Task Queues

- `agent/tasks/homepage.json`
- `agent/tasks/awards.json`
- `agent/tasks/user-pages.json`
- `agent/tasks/admin-pages.json`

## Branches

- Agent foundation: `redesign/agent-foundation`
- Homepage tasks: `redesign/homepage-public`
- Awards tasks: `codex/awards-contests`
- User page tasks: `codex/user-mypage`
- Admin planning and previews: `redesign/admin-foundation`
- Integration QA: `codex/integration-awards-mypage`

## Safety

Run one task at a time. Do not ask Codex to redesign the whole app in a single run.

Start with low-risk visual pages or sections. Avoid `/admin/users`, auth, permissions, destructive CRUD, or production data workflows until the page-renewal MVP has been proven.

Every implementation task should end with:

- changed files
- verification commands
- QA/self-review notes
- known risks
- visible result: browser page, preview URL, deployed URL, screenshot, or local artifact
