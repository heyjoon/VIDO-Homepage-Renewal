# VIDO Homepage Renewal

VIDO Homepage Renewal repository for separating the existing gallery/upload flow from new Awards and My Page work.

## Branch Roles

```txt
main
  Existing VIDO Gallery and artwork upload foundation.

codex/awards-contests
  Branch 1. Awards and contest feature development.

codex/user-mypage
  Branch 2. User My Page backend and dashboard development.

codex/integration-awards-mypage
  Integration branch for validating branch 1 + branch 2 before merging to main.
```

## Core Rule

`main` should stay focused on the current VIDO gallery and upload capability. Contest features and user dashboard features should be developed in separate branches, then validated together in the integration branch.

## Development Loop

1. Keep artwork upload and core `Artwork` contracts stable on `main`.
2. Build contest listing, detail, and submission flows on `codex/awards-contests`.
3. Build user dashboard, my artworks, submissions, and activity views on `codex/user-mypage`.
4. Merge both feature branches into `codex/integration-awards-mypage` for QA.
5. Merge the integration branch back into `main` only after the upload -> contest submission -> mypage loop works end to end.

## Product Direction

VIDO is where artists upload and manage media artworks. Awards and contests should give users a reason to upload and reuse those artworks instead of uploading the same media file again.
