# Redesign Task Breakdown

Use this as the source of truth for Codex task execution. Each task should be small enough to finish in one branch or one pull request.

## Phase 0: Agent Foundation

| ID | Task | Owner Prompt | Branch | Status |
|---|---|---|---|---|
| R0-001 | Add AGENTS.md and redesign docs | Planner | `redesign/agent-foundation` | In progress |
| R0-002 | Add inventory prompt and task queues | Planner | `redesign/agent-foundation` | In progress |
| R0-003 | Create PR sequence and verification rules | Planner | `redesign/agent-foundation` | In progress |

## Phase 1: Repository Inventory

| ID | Task | Owner Prompt | Branch | Status |
|---|---|---|---|---|
| R1-001 | Detect framework, package manager, and scripts | Repo Analyst | `redesign/agent-foundation` | Todo |
| R1-002 | Map public, user, admin, and API routes | Repo Analyst | `redesign/agent-foundation` | Todo |
| R1-003 | Identify auth, upload, DB, and storage boundaries | Repo Analyst | `redesign/agent-foundation` | Todo |
| R1-004 | Update `docs/redesign/01-route-inventory.md` | Repo Analyst | `redesign/agent-foundation` | Todo |

## Phase 2: Homepage Renewal

| ID | Task | Owner Prompt | Branch | Status |
|---|---|---|---|---|
| H-001 | Build homepage hero with upload and contest CTAs | Homepage Worker | `redesign/homepage-public` | Todo |
| H-002 | Add upload-to-contest bridge section | Homepage Worker | `redesign/homepage-public` | Todo |
| H-003 | Add media-art gallery credibility section | Homepage Worker | `redesign/homepage-public` | Todo |
| H-004 | Add responsive homepage QA | QA Reviewer | `redesign/homepage-public` | Todo |

## Phase 3: Awards / Contest Branch

| ID | Task | Owner Prompt | Branch | Status |
|---|---|---|---|---|
| A-001 | Add contest domain types and mock data | Awards Worker | `codex/awards-contests` | Todo |
| A-002 | Build contest list and detail routes | Awards Worker | `codex/awards-contests` | Todo |
| A-003 | Build ArtworkPicker primary submission path | Awards Worker | `codex/awards-contests` | Todo |
| A-004 | Add direct ZIP upload fallback state | Awards Worker | `codex/awards-contests` | Todo |
| A-005 | Add contest submission API contract | Awards Worker | `codex/awards-contests` | Todo |

## Phase 4: User My Page Branch

| ID | Task | Owner Prompt | Branch | Status |
|---|---|---|---|---|
| M-001 | Add mypage dashboard data contract | User Page Worker | `codex/user-mypage` | Todo |
| M-002 | Build my artwork summary and list | User Page Worker | `codex/user-mypage` | Todo |
| M-003 | Build submission history section | User Page Worker | `codex/user-mypage` | Todo |
| M-004 | Build recent activity section | User Page Worker | `codex/user-mypage` | Todo |
| M-005 | Add profile/account section | User Page Worker | `codex/user-mypage` | Todo |

## Phase 5: Admin Renewal

| ID | Task | Owner Prompt | Branch | Status |
|---|---|---|---|---|
| AD-001 | Inventory admin routes and permissions | Admin Worker | `redesign/admin-foundation` | Todo |
| AD-002 | Build admin dashboard shell | Admin Worker | `redesign/admin-foundation` | Todo |
| AD-003 | Add artwork review table | Admin Worker | `redesign/admin-foundation` | Todo |
| AD-004 | Add contest management table | Admin Worker | `redesign/admin-foundation` | Todo |
| AD-005 | Add submission review table | Admin Worker | `redesign/admin-foundation` | Todo |

## Phase 6: Integration QA

| ID | Task | Owner Prompt | Branch | Status |
|---|---|---|---|---|
| Q-001 | Merge awards and mypage into integration branch | QA Reviewer | `codex/integration-awards-mypage` | Todo |
| Q-002 | Verify upload -> contest -> mypage loop | QA Reviewer | `codex/integration-awards-mypage` | Todo |
| Q-003 | Verify permissions and ownership checks | QA Reviewer | `codex/integration-awards-mypage` | Todo |
| Q-004 | Run lint/build/test and document gaps | QA Reviewer | `codex/integration-awards-mypage` | Todo |
