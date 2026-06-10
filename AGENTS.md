# AGENTS.md

## Mission

This repository is for the VIDO homepage renewal. Codex should help redesign and rebuild the public homepage, user pages, and admin pages while keeping the existing VIDO gallery/upload foundation stable.

The immediate automation MVP is not full autonomous product development. It is:

```txt
Codex safely analyzes one page or section
-> makes a scoped improvement
-> runs available checks
-> self-reviews the diff
-> shows the result to the user
```

## Automation Strategy

Current recommendation:

```txt
Codex CLI + AGENTS.md + .codex/agents
```

Next:

```txt
codex exec runs one task at a time
```

Later:

```txt
TypeScript Codex SDK task runner
```

Final:

```txt
Agents SDK + Codex MCP planner / developer / QA multi-agent orchestration
```

Do not jump to full multi-agent orchestration before the one-page MVP loop works reliably.

## Product Loop

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
- `redesign/agent-foundation`: Codex agent rules, `.codex/agents`, redesign docs, prompts, and task queues.
- `redesign/homepage-public`: public homepage and low-risk visible page renewal.
- `codex/awards-contests`: contest listing, detail, eligibility, and submission flow.
- `codex/user-mypage`: user dashboard, my artworks, submission history, activity, profile.
- `redesign/admin-foundation`: admin information architecture and non-destructive admin previews.
- `codex/integration-awards-mypage`: integration QA before merging to `main`.

Do not mix branch scopes unless the user explicitly asks for integration work.

## First Automation Target Rule

Start with low-risk visible pages or sections:

- homepage hero or upload-to-awards bridge section
- user dashboard summary panel
- my artworks display section
- awards listing cards
- awards application selection UI

Do not use `/admin/users`, permissions, destructive CRUD, auth enforcement, billing, or production data workflows as the first automation proof.

## Codex Working Loop

For redesign work, Codex should follow this loop:

1. Read this `AGENTS.md`.
2. Read the relevant profile in `.codex/agents/`.
3. Read `docs/redesign/00-product-goals.md` and `docs/redesign/02-design-system.md`.
4. Pick exactly one task or one target page section.
5. Inspect the current route/component files before editing.
6. Implement only the requested scope.
7. Run available lint/typecheck/build/test commands.
8. Self-review using `.codex/agents/qa-reviewer.md`.
9. Summarize changed files, verification, and remaining risk.
10. End by showing the result: open the page when possible, or provide the exact preview URL, deployed URL, local file link, or screenshot path that lets the user see the work immediately.

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

Admin CRUD and permission work should wait until the one-page automation MVP has been proven on lower-risk pages.

## Backend Contract Rules

`Artwork` belongs to the upload/gallery foundation. Other branches may reference `Artwork.id` but should not redefine upload ownership.

Contest submission creation belongs to `codex/awards-contests`.

My Page reads and aggregates user-owned records but should not create contest submissions directly.

## Verification

Before calling work complete, run the project commands that exist in the repo. If no project exists yet, say so and verify by checking file structure and links.

Expected checks once an app exists:

```bash
npm run verify
```

If `verify` does not exist, use the repo's actual package scripts, such as:

```bash
npm run lint
npm run build
npm test
```

After verification, show the result using the Show-The-Work Rule above.

## Official Codex Notes

Codex reads repository guidance from `AGENTS.md`. Keep durable repo conventions here. Keep task prompts in `agent/prompts` and feed them to Codex explicitly when running `codex exec` or an interactive Codex session.
