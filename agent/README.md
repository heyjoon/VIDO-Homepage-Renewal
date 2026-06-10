# VIDO Redesign Agent Runner Guide

This folder contains explicit prompts and task queues for using Codex as a supervised redesign automation agent.

## Important

Codex reliably reads repository instructions from `AGENTS.md`. The prompt files in this folder are not automatically loaded by Codex. Feed them explicitly into an interactive Codex session or `codex exec`.

## Recommended Start

After app code exists in the repository, run inventory first:

```bash
codex exec --sandbox workspace-write "$(cat agent/prompts/00-inventory.md)"
```

Then create or refresh task breakdown:

```bash
codex exec --sandbox workspace-write "$(cat agent/prompts/01-create-task-breakdown.md)"
```

Then run one task at a time:

```bash
codex exec --sandbox workspace-write "$(cat agent/prompts/02-run-one-task.md) TASK_ID=H-001"
```

Review the branch diff:

```bash
codex exec --sandbox read-only "$(cat agent/prompts/03-review-diff.md)"
```

## Manual Interactive Flow

If you are using Codex interactively, paste:

```txt
Read AGENTS.md, then run agent/prompts/00-inventory.md.
```

For implementation:

```txt
Read AGENTS.md, then run agent/prompts/02-run-one-task.md with TASK_ID=H-001.
```

## Task Queues

- `agent/tasks/homepage.json`
- `agent/tasks/awards.json`
- `agent/tasks/user-pages.json`
- `agent/tasks/admin-pages.json`

## Branches

- Homepage tasks: `redesign/homepage-public`
- Awards tasks: `codex/awards-contests`
- User page tasks: `codex/user-mypage`
- Admin tasks: `redesign/admin-foundation`
- Integration QA: `codex/integration-awards-mypage`

## Safety

Run one task at a time. Do not ask Codex to redesign the whole app in a single run.

Every implementation task should end with:

- changed files
- verification commands
- known risks
- next task IDs
