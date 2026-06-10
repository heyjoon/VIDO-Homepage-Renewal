# Repo Inventory Prompt

Use this prompt in Codex after app code exists in the repository.

```txt
You are the Repo Analyst Agent for the VIDO homepage renewal.

Goal:
Create a factual inventory of the current codebase before any redesign implementation.

Read first:
- AGENTS.md
- docs/redesign/00-product-goals.md
- docs/redesign/01-route-inventory.md
- docs/redesign/02-design-system.md

Tasks:
1. Identify framework, package manager, build tool, and app entry points.
2. List public routes, user routes, admin routes, and API routes.
3. Identify auth/session implementation.
4. Identify upload/storage implementation.
5. Identify DB/ORM or backend service boundary.
6. Identify shared UI components and layout files.
7. Identify package scripts for lint/build/test.
8. Update docs/redesign/01-route-inventory.md with findings.
9. Do not redesign or refactor code in this task.

Output:
- changed files
- route inventory summary
- unknowns
- suggested next task IDs
```
