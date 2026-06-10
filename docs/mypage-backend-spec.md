# Branch 2: User My Page Backend Spec

Branch:

```txt
codex/user-mypage
```

## Purpose

Build the user-facing dashboard for VIDO artists. My Page should show uploaded artworks, artwork readiness, contest submissions, and recent activity.

## API Routes

```txt
GET   /api/me/dashboard
GET   /api/me/artworks
GET   /api/me/submissions
GET   /api/me/activity
GET   /api/me/profile
PATCH /api/me/profile
```

## Dashboard Response

```ts
export type MyPageDashboard = {
  user: {
    id: string;
    name?: string;
    email: string;
  };
  stats: {
    totalArtworks: number;
    readyArtworks: number;
    processingArtworks: number;
    submittedContests: number;
    openContests: number;
  };
  artworks: Array<{
    id: string;
    title: string;
    thumbnailUrl?: string;
    status: "DRAFT" | "PROCESSING" | "READY" | "REJECTED";
    canSubmitToContest: boolean;
  }>;
  submissions: Array<{
    id: string;
    contestTitle: string;
    artworkTitle?: string;
    status: "SUBMITTED" | "UNDER_REVIEW" | "ACCEPTED" | "REJECTED";
    submissionNumber: string;
    submittedAt: string;
  }>;
  activity: Array<{
    id: string;
    type:
      | "ARTWORK_UPLOADED"
      | "ARTWORK_READY"
      | "CONTEST_SUBMITTED"
      | "SUBMISSION_UPDATED";
    title: string;
    createdAt: string;
  }>;
};
```

## Page Structure

```txt
/mypage
  - summary stats
  - my VIDO artworks
  - contest submissions
  - recent activity
  - profile/account
```

## Ownership Rule

This branch reads contest submissions but does not create contest submissions. Submission creation belongs to `codex/awards-contests`.

## Acceptance Criteria

- A logged-in user can see their uploaded artworks.
- `READY` artworks show a contest submission CTA.
- Contest submission records appear after submission.
- Activity updates when artwork or submission status changes.
