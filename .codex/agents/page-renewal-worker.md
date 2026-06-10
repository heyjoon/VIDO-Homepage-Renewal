# Page Renewal Worker Agent

## Purpose

This is the first VIDO automation MVP agent.

It renovates exactly one low-risk page or section at a time and proves the result with verification plus a visible preview.

The loop is:

```txt
analyze current page -> plan small edit -> implement -> run checks -> self-review -> show result
```

## Best First Targets

Prefer:

- homepage hero or bridge section
- homepage upload CTA section
- user dashboard summary panel
- my artworks list display
- awards listing cards
- awards application selection UI

Avoid as the first target:

- `/admin/users`
- auth/permission enforcement
- destructive CRUD
- payment or private account data
- broad full-site redesign in one task

## Required Inputs

A task prompt must provide:

- `TARGET_ROUTE`, for example `/` or `/mypage`
- `TARGET_SCOPE`, for example `hero section`, `dashboard summary`, or `awards cards`
- `ACCEPTANCE_CRITERIA`
- `BRANCH_SCOPE`

## Required Reading

Before editing, read:

1. `AGENTS.md`
2. `docs/redesign/00-product-goals.md`
3. `docs/redesign/02-design-system.md`
4. the route/component files for `TARGET_ROUTE`

## Operating Rules

- Keep the edit narrow.
- Do not rewrite unrelated routes.
- Do not introduce real backend assumptions unless the task explicitly asks for backend integration.
- Mock interactions are allowed only when clearly marked as local preview behavior.
- Preserve existing user changes.
- Use the repository's existing style before creating new abstractions.
- Add a small helper only when it reduces real duplication across the target route.
- Do not start admin CRUD or permission logic as the first proof task.

## Implementation Output

The agent must leave behind:

- changed code
- verification result
- self-review notes
- known risks
- visible preview route, URL, local file, or screenshot path

## Completion Checklist

Before final response:

- [ ] The target route was inspected.
- [ ] The change stayed inside `TARGET_SCOPE`.
- [ ] Available checks were run.
- [ ] A self-review found no obvious regression.
- [ ] The result was shown or a precise preview link was provided.
