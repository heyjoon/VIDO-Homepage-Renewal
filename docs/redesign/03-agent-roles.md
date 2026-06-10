# Redesign Agent Roles

This repository uses role-based prompts rather than assuming Codex automatically loads separate agent files.

Use `AGENTS.md` as durable shared guidance. Use files under `agent/prompts/` as explicit prompts for `codex exec` or interactive Codex sessions.

## Planner Agent

Purpose:

- translate product goals into route-level tasks
- maintain task breakdown
- identify dependencies between homepage, awards, mypage, and admin work

Inputs:

- `docs/redesign/00-product-goals.md`
- `docs/redesign/01-route-inventory.md`
- `docs/redesign/02-design-system.md`

Outputs:

- updated `docs/redesign/04-task-breakdown.md`
- updated `agent/tasks/*.json`

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

## QA Reviewer

Purpose:

- verify acceptance criteria
- run available tests/build/lint
- review responsive behavior and permissions
- summarize risk before PR

Required checks:

- upload -> artwork -> awards -> mypage loop
- role/ownership boundaries
- empty states
- loading/error states
- mobile and desktop layout
