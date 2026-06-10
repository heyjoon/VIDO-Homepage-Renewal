# Deployment Readiness

This branch prepares the VIDO homepage renewal for static deployment.

## Current Target

GitHub Pages static deployment using Next.js static export.

Expected project URL after Pages is enabled:

```txt
https://heyjoon.github.io/VIDO-Homepage-Renewal/
```

## Files

- `next.config.mjs` enables `output: "export"`.
- `next.config.mjs` applies the GitHub repository name as `basePath` during GitHub Actions builds.
- `public/.nojekyll` prevents GitHub Pages from filtering the exported `_next` assets.
- `.github/workflows/deploy-pages.yml` verifies the build and deploys `./out` to GitHub Pages.
- `.gitignore` keeps local install and build artifacts out of the repo.

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

## Pre-Deploy Checklist

- PR #2 is reviewed and merged to `main`.
- GitHub Pages source is set to GitHub Actions.
- The Pages workflow completes successfully on `main`.
- The deployed URL opens without missing CSS or JavaScript assets.
- Navigation works for the included routes.

## Known Limitations

- This is a frontend scaffold and preview build.
- Real auth, upload, DB, contest submission, and mypage APIs are not implemented here.
- Awards backend belongs to `codex/awards-contests`.
- User dashboard backend belongs to `codex/user-mypage`.
- Admin backend belongs to `redesign/admin-foundation`.
