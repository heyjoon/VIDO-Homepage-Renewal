# Redesign PR Sequence

This sequence keeps the VIDO renewal reviewable and avoids mixing unrelated changes into `main`.

## PR 0: Agent Foundation

```txt
redesign/agent-foundation -> main
```

Purpose:

- Add `AGENTS.md`
- Add redesign docs
- Add task queues and prompts
- Add branch execution rules

Do not include product implementation in this PR.

## PR 1: Homepage Public Renewal

```txt
redesign/homepage-public -> main
```

Purpose:

- Redesign homepage hero
- Add upload CTA
- Add Awards bridge CTA
- Add media-art positioning
- Keep existing upload/gallery links working

Checks:

- Homepage loads on desktop and mobile
- Upload CTA routes correctly
- Awards CTA routes correctly
- No auth-only page is exposed unintentionally

## PR 2: Awards / Contest Feature

```txt
codex/awards-contests -> codex/integration-awards-mypage
```

Purpose:

- Add contest list/detail
- Add contest submission flow
- Add existing-artwork primary path
- Add ZIP fallback

Checks:

- OPEN contests accept submissions
- CLOSED contests reject submissions
- READY artworks are selectable
- Non-owned artworks cannot be submitted

## PR 3: User My Page Feature

```txt
codex/user-mypage -> codex/integration-awards-mypage
```

Purpose:

- Add My Page dashboard
- Add My Artworks section
- Add submission history
- Add recent activity

Checks:

- Logged-in user sees own records only
- READY artworks show contest CTA
- Submitted contests appear in history
- Empty states are clear

## PR 4: Integration

```txt
codex/integration-awards-mypage -> main
```

Purpose:

- Validate Awards and My Page together
- Confirm upload -> artwork -> contest -> mypage loop

Checks:

- Full flow works end to end
- Branch ownership rules were respected
- Lint/build/test pass or gaps are documented

## PR 5: Admin Renewal

```txt
redesign/admin-foundation -> main
```

Purpose:

- Add admin dashboard shell
- Add artwork review
- Add contest management
- Add submission review

Checks:

- Admin-only routes are protected
- Tables are filterable and readable
- Status changes are auditable

## PR Rule

Every PR should include:

- what changed
- why it changed
- screenshots or preview links when UI changes
- verification commands
- known gaps
- next PR dependency
