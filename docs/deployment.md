# Deployment Readiness

This branch prepares the VIDO homepage renewal for static deployment.

## Current Target

GitHub Pages static deployment using Next.js static export.

## Files

- `next.config.mjs` enables `output: "export"`.
- `.github/workflows/deploy-pages.yml` builds the site and deploys `./out` to GitHub Pages.

## Local Verification

Run after cloning the branch locally:

```bash
npm install
npm run build
```

Optional:

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

## Known Limitations

- This is a frontend scaffold and preview build.
- Real auth, upload, DB, contest submission, and mypage APIs are not implemented here.
- Awards backend belongs to `codex/awards-contests`.
- User dashboard backend belongs to `codex/user-mypage`.
- Admin backend belongs to `redesign/admin-foundation`.
