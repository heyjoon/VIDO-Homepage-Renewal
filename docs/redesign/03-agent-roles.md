# Redesign Agent Roles

This repository uses role-based agent profiles plus explicit prompts.

Use `AGENTS.md` as durable shared guidance. Use `.codex/agents/` as the current agent profile directory. Use files under `agent/prompts/` as explicit prompts for `codex exec` or interactive Codex sessions.

## Current MVP Role Model

The immediate MVP is one supervised worker plus one self-review checklist:

```txt
Page Renewal Worker -> QA Reviewer checklist -> visible result
```

This proves that Codex can safely analyze, modify, test, review, and show one page before expanding into larger orchestration.

## Planner Agent

Profile:

- `.codex/agents/planner.md`

Purpose:

- translate product goals into route-level tasks
- maintain task breakdown
- identify dependencies between homepage, awards, mypage, and admin work
- choose low-risk first targets before admin CRUD

Inputs:

- `docs/redesign/00-product-goals.md`
- `docs/redesign/01-route-inventory.md`
- `docs/redesign/02-design-system.md`

Outputs:

- updated `docs/redesign/04-task-breakdown.md`
- updated `agent/tasks/*.json`

## Page Renewal Worker

Profile:

- `.codex/agents/page-renewal-worker.md`

Purpose:

- implement exactly one low-risk page or section renewal
- keep the change scoped
- run checks
- show the result

Best first surfaces:

- homepage section
- user dashboard summary
- awards listing cards
- upload-to-awards bridge

Avoid as first proof:

- `/admin/users`
- real permission logic
- destructive CRUD
- production data operations

## Repo Analyst Agent

Purpose:

- inspect the actual codebase
- map routes, components, APIs, auth, state, tests
- identify risky areas before implementation

Output:

- filled `docs/redesign/01-route-inventory.md`

## Homepage Worker

Purpose:

- implement public homepage renewal
- connect upload CTA, awards CTA, and media-art positioning

Owned surfaces:

- `/`
- shared marketing components
- homepage sections

## Awards Worker

Purpose:

- implement contest discovery and submission flow
- make VIDO artwork selection the primary path

Owned surfaces:

- `/awards`
- `/awards/[slug]`
- `/awards/[slug]/apply`
- contest APIs

## User Page Worker

Purpose:

- implement My Page and user-owned views
- aggregate artworks, submissions, activity, profile

Owned surfaces:

- `/mypage`
- `/artworks`
- `/submissions`
- `/api/me/*`

## Admin Worker

Purpose:

- implement admin dashboard and review surfaces
- keep admin UI dense, scannable, and status-driven

Owned surfaces:

- `/admin`
- `/admin/artworks`
- `/admin/contests`
- `/admin/submissions`

Admin CRUD and user permission management should wait until the page-renewal MVP has passed on lower-risk surfaces.

## QA Reviewer

Profile:

- `.codex/agents/qa-reviewer.md`

Purpose:

- verify acceptance criteria
- run available tests/build/lint/typecheck
- review responsive behavior and permissions risk
- summarize risk before PR
- make the result visible before the final response

Required checks:

- changed files match scope
- upload -> artwork -> awards -> mypage loop when relevant
- role/ownership boundaries
- empty states when relevant
- loading/error states when relevant
- mobile and desktop layout risk
- preview route, deployed URL, browser tab, screenshot, or local artifact is provided at the end

## Future Orchestration

After the one-page MVP is reliable:

1. Use `codex exec` to run queued tasks one at a time.
2. Add a TypeScript task runner that reads `agent/tasks/*.json`.
3. Use Agents SDK + Codex MCP for planner / developer / QA multi-agent orchestration.
