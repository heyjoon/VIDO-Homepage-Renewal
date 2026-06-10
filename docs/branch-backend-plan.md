# VIDO Branch Backend Plan

## Branch Map

| Branch | Role | Owns |
|---|---|---|
| `main` | Current VIDO Gallery / Upload | Auth, upload, artwork base contracts |
| `codex/awards-contests` | Contest feature | Contest, submission, eligibility |
| `codex/user-mypage` | My Page feature | User dashboard, my artworks, submissions read model |
| `codex/integration-awards-mypage` | QA integration | End-to-end validation |

## Ownership Rules

### `main`

Owns:

- Artwork upload
- Artwork file storage
- Artwork processing status
- Core `Artwork` contract

Shared contract:

```ts
export type ArtworkStatus = "DRAFT" | "PROCESSING" | "READY" | "REJECTED";

export type Artwork = {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  status: ArtworkStatus;
  createdAt: string;
  updatedAt: string;
};
```

### `codex/awards-contests`

Owns:

- Contest list/detail
- Contest eligibility
- Contest submission creation
- Submission status
- ZIP direct upload fallback

Must not own:

- Artwork upload
- User dashboard aggregation

### `codex/user-mypage`

Owns:

- `/mypage`
- `/api/me/dashboard`
- `/api/me/artworks`
- `/api/me/submissions`
- `/api/me/activity`
- `/api/me/profile`

Must not own:

- Contest submission creation
- Contest judging/admin rules

## Integration Checks

Before merging back to `main`, verify:

- Uploading an artwork creates an `Artwork` visible in My Page.
- A `READY` artwork appears in contest submission.
- Submitting a contest creates a submission record.
- The submission appears in My Page.
- A user cannot submit another user's artwork.
- Closed contests cannot receive submissions.
- ZIP upload remains available as fallback.
