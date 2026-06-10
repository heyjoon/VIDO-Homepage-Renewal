# Branch 1: Awards / Contest Backend Spec

Branch:

```txt
codex/awards-contests
```

## Purpose

Build contest functionality around existing VIDO artworks. The primary submission path is selecting a previously uploaded VIDO artwork. Direct ZIP upload remains a fallback only.

## Domain Types

```ts
export type ContestStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "OPEN"
  | "CLOSED"
  | "JUDGING"
  | "ANNOUNCED";

export type SubmissionMode = "VIDO_ARTWORK" | "DIRECT_UPLOAD";

export type SubmissionStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELED";

export type Contest = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: ContestStatus;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
};

export type ContestSubmission = {
  id: string;
  contestId: string;
  userId: string;
  artworkId?: string;
  directUploadFileKey?: string;
  mode: SubmissionMode;
  status: SubmissionStatus;
  submissionNumber: string;
  createdAt: string;
  updatedAt: string;
};
```

## API Routes

```txt
GET  /api/contests
GET  /api/contests/:slug
GET  /api/contests/:slug/eligibility
POST /api/contests/:slug/submissions
GET  /api/me/contest-submissions
```

## Submission Rules

- Contest must be `OPEN`.
- If `mode` is `VIDO_ARTWORK`, `artworkId` is required.
- The artwork must belong to the current user.
- The artwork must be `READY`.
- If `mode` is `DIRECT_UPLOAD`, `directUploadFileKey` is required.
- Prevent duplicate submissions when the contest only allows one submission per user.

## Acceptance Criteria

- A user with one `READY` artwork can submit to an `OPEN` contest without uploading the media file again.
- A user without artworks sees a CTA to upload artwork first.
- Direct ZIP upload still works as fallback.
- Submissions include contest title, selected artwork title, submission number, and status.
