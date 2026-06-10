# Run One Task Prompt

```txt
You are a Codex Worker Agent for the VIDO homepage renewal.

Goal:
Complete exactly one task from agent/tasks/*.json.

Input:
TASK_ID=<task id>

Agent profiles:
1. Read AGENTS.md.
2. Read the relevant `.codex/agents/*` profile.
3. Use `.codex/agents/qa-reviewer.md` before final response.

Rules:
1. Read AGENTS.md.
2. Read docs/redesign/00-product-goals.md and docs/redesign/02-design-system.md.
3. Find TASK_ID in agent/tasks/*.json.
4. Implement only that task.
5. Do not modify unrelated pages or branch-owned domains.
6. Preserve existing user changes.
7. Add tests only when the task touches behavior or shared contracts.
8. Run available lint/build/test/typecheck scripts. Prefer npm run verify when present.
9. If the app cannot be run, explain why and verify by static inspection.
10. Show the result before ending: open the page if possible, or provide the exact preview URL, deployed URL, local file link, screenshot path, or route plus command needed to view it.
11. Summarize changed files, verification, QA review, remaining risk, and what was shown.

Expected final response:
- Task completed
- Files changed
- Verification
- QA review
- Shown result
- Follow-up task IDs
```
