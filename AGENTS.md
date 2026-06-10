# AGENTS.md

## Mission

This repository is for the VIDO homepage renewal. Codex should help redesign and rebuild the public homepage, user pages, and admin pages while keeping the existing VIDO gallery/upload foundation stable.

The product loop is:

```txt
User visits VIDO
-> uploads media artwork
-> manages artwork in My Page
-> submits existing artwork to Awards/Contests
-> tracks submission status
-> returns for the next contest or exhibition opportunity
```

## Branch Discipline

Use these branch boundaries:

- `main`: current VIDO gallery and upload foundation only.
- `redesign/agent-foundation`: Codex agent rules, redesign docs, prompts, and task queues.
- `codex/awards-contests`: contest listing, detail, eligibility, and submission flow.
- `codex/user-mypage`: user dashboard, my artworks, submission history, activity, profile.
- `codex/integration-awards-mypage`: integration QA before merging to `main`.

Do not mix branch scopes unless the user explicitly asks for integration work.

## Codex Working Loop

For redesign work, Codex should follow this loop:

1. Read this `AGENTS.md`.
2. Read `docs/redesign/00-product-goals.md`.
3. If inventory is missing, run the inventory prompt in `agent/prompts/00-inventory.md`.
4. Pick one task from `agent/tasks/*.json`.
5. Implement only that task.
6. Run available lint/build/test commands.
7. Update the task status or write a short implementation note.
8. Summarize changed files, verification, and remaining risk.
9. End by showing the result: open the page when possible, or provide the exact preview URL, deployed URL, local file link, or screenshot path that lets the user see the work immediately.

## Show-The-Work Rule

Every VIDO redesign task must finish with a visible result for the user.

Use the strongest available option:

1. Open the running local page in the browser.
2. If a browser cannot be opened, provide the localhost or deployed preview URL.
3. If the app cannot run, provide a local HTML preview file or screenshot artifact.
4. If no visual artifact exists, create a short preview note that names the route, expected screen state, and next command to view it.

Do not end a frontend, admin, awards, or mypage task with only a text summary when a visual route or artifact can be shown.

## Design Direction

VIDO should feel like a serious media-art platform, not a generic SaaS landing page.

Use:

- black/white base
- precise grid layouts
- high-contrast media surfaces
- restrained accent colors
- clear upload and contest CTAs
- dense but readable admin/user interfaces

Avoid:

- generic marketing hero cards
- decorative gradient blobs
- one-note purple/blue palettes
- nested card-heavy layouts
- vague CTA copy

## Feature Boundaries

### Homepage

Homepage work should emphasize:

- media-art upload
- VIDO gallery credibility
- artwork reuse for contests
- bridge from homepage to Awards and My Page

### Awards

Contest work should emphasize:

- browsing open contests
- selecting existing VIDO artworks
- direct ZIP upload only as fallback
- clear submission status

### My Page

My Page work should emphasize:

- user summary stats
- my VIDO artworks
- artwork readiness
- contest submission history
- recent activity

### Admin

Admin work should emphasize:

- content management
- artwork review
- contest management
- submission review
- audit-friendly states and tables

## Backend Contract Rules

`Artwork` belongs to the upload/gallery foundation. Other branches may reference `Artwork.id` but should not redefine upload ownership.

Contest submission creation belongs to `codex/awards-contests`.

My Page reads and aggregates user-owned records but should not create contest submissions directly.

## Verification

Before calling work complete, run the project commands that exist in the repo. If no project exists yet, say so and verify by checking file structure and links.

Expected checks once an app exists:

```bash
npm run lint
npm run build
npm test
```

If commands differ, use the repo's actual package scripts.

After verification, show the result using the Show-The-Work Rule above.

## Official Codex Notes

Codex reads repository guidance from `AGENTS.md`. Keep durable repo conventions here. Keep task prompts in `agent/prompts` and feed them to Codex explicitly when running `codex exec` or an interactive Codex session.
