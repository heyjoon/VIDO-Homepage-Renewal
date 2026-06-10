# Route Inventory

Codex should fill this file after the actual app code is added or cloned into this repository.

## Inventory Command

Use the repo's framework conventions. For Next.js, inspect:

```txt
app/**/page.tsx
app/**/route.ts
pages/**/*
src/app/**
src/pages/**
```

For other frameworks, identify router files first before editing.

## Public Routes

| Route | Purpose | Current Status | Redesign Priority | Notes |
|---|---|---|---|---|
| `/` | Homepage | Unknown | P0 | Upload and contest bridge |
| `/media-art` | Media art gallery | Unknown | P1 | Existing VIDO gallery |
| `/author` | Artist page | Unknown | P1 | Artist onboarding |
| `/collector` | Collector page | Unknown | P2 | Collection/subscription story |
| `/awards` | Contest home | Planned | P0 | Branch 1 |
| `/awards/[slug]` | Contest detail | Planned | P0 | Branch 1 |

## User Routes

| Route | Purpose | Current Status | Redesign Priority | Notes |
|---|---|---|---|---|
| `/login` | Login | Unknown | P1 | Keep auth stable |
| `/mypage` | User dashboard | Planned | P0 | Branch 2 |
| `/artworks` | My artworks | Planned | P0 | Depends on upload foundation |
| `/artworks/upload` | Upload artwork | Unknown | P0 | Main foundation |
| `/submissions` | Contest submissions | Planned | P0 | Branch 2 |

## Admin Routes

| Route | Purpose | Current Status | Redesign Priority | Notes |
|---|---|---|---|---|
| `/admin` | Admin dashboard | Planned | P1 | Later phase |
| `/admin/artworks` | Artwork review | Planned | P1 | Status review |
| `/admin/contests` | Contest management | Planned | P1 | Branch 1 admin surface |
| `/admin/submissions` | Submission review | Planned | P1 | Branch 1/admin integration |

## API Routes

| Route | Owner Branch | Purpose | Notes |
|---|---|---|---|
| `/api/me/artworks` | main / branch2 read | Get user's artworks | Main owns upload, mypage reads |
| `/api/contests` | branch1 | Contest list | Awards |
| `/api/contests/:slug/submissions` | branch1 | Create submission | Awards owns creation |
| `/api/me/dashboard` | branch2 | My Page aggregation | Read model |
| `/api/me/submissions` | branch2 | My submissions | Read model |

## Unknowns To Resolve

- Framework and routing mode.
- Current auth/session implementation.
- Current upload storage.
- Current database ORM or API server.
- Existing build/lint/test commands.
