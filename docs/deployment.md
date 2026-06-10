# Deployment Readiness

This branch prepares a scoped VIDO.gallery extension for static deployment review.

## Current Target

GitHub Pages static deployment using Next.js static export.

Expected project URL after Pages is enabled:

```txt
https://heyjoon.github.io/VIDO-Homepage-Renewal/
```

## Product Scope

This branch is not a full VIDO.gallery rebuild. The intended direction is:

- Keep existing `https://vido.gallery/` product flows as the base experience.
- Add the contest home/list/notice/FAQ module based on `https://html.justbuild.kr/vido/`.
- Connect contest submission to existing VIDO artwork upload and My Page concepts.
- Treat direct ZIP upload as a fallback path, not the main submission path.

## Files

- `next.config.mjs` enables `output: "export"`.
- `next.config.mjs` applies the GitHub repository name as `basePath` during GitHub Actions builds.
- `public/.nojekyll` prevents GitHub Pages from filtering the exported `_next` assets.
- `.github/workflows/deploy-pages.yml` verifies the build and deploys `./out` to GitHub Pages.
- `.gitignore` keeps local install and build artifacts out of the repo.
- `docs/contest-extension-scope.md` records the narrowed contest-only integration scope.

## Local Verification

Run after cloning the branch locally:

```bash
npm install
npm run verify
```

Optional local preview:

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## GitHub Pages Setup

After merging to `main`, check repository settings:

```txt
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

The workflow deploys on pushes to `main` and can also be run manually from:

```txt
Actions -> Deploy Next.js static site to GitHub Pages -> Run workflow
```

## Routes Included

- `/`
- `/media-art`
- `/awards`
- `/awards/apply`
- `/artworks/upload`
- `/mypage`
- `/admin`

## Contest Extension Coverage

`/awards` now mirrors the justbuild contest-home information structure:

- 공모전 통합 플랫폼 hero
- 진행중 공모전 CTA
- 내 접수 내역 CTA
- 인기 공모전
- 모든 공모전 list cards
- 공지사항
- 통합 FAQ
- VIDO 작품으로 접수 안내

`/awards/apply` keeps the intended connection point for selecting an existing VIDO artwork and using ZIP upload only as a fallback.

## Pre-Deploy Checklist

- PR #2 is reviewed and merged to `main`.
- GitHub Pages source is set to GitHub Actions.
- The Pages workflow completes successfully on `main`.
- The deployed URL opens without missing CSS or JavaScript assets.
- Navigation works for the included routes.
- `/awards` clearly reads as a contest module added onto VIDO.gallery, not as a replacement for the live site.

## Known Limitations

- This is a frontend scaffold and preview build.
- Real auth, upload, DB, contest submission, and mypage APIs are not implemented here.
- Awards backend belongs to `codex/awards-contests`.
- User dashboard backend belongs to `codex/user-mypage`.
- Admin backend belongs to `redesign/admin-foundation`.
