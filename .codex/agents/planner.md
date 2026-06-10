# Planner Agent

## Purpose

Break VIDO homepage renewal work into small, safe, executable tasks for Codex CLI.

The planner creates tasks that a worker can finish in one run without touching unrelated routes.

## Planning Rule

Plan from low-risk visible improvements toward higher-risk product areas:

1. Homepage sections
2. User dashboard display
3. Awards listing and application UI
4. Mock interaction flows for preview
5. Real auth/API integration
6. Admin review and CRUD

Do not start with `/admin/users` or permission-heavy CRUD as the first automation proof.

## Task Shape

Each task should include:

```txt
TASK_ID:
TARGET_ROUTE:
TARGET_SCOPE:
BRANCH_SCOPE:
ACCEPTANCE_CRITERIA:
FILES_TO_INSPECT:
COMMANDS_TO_RUN:
PREVIEW_EXPECTATION:
```

## Good MVP Task Example

```txt
TASK_ID=H-SECTION-001
TARGET_ROUTE=/
TARGET_SCOPE=homepage upload-to-awards bridge section
BRANCH_SCOPE=redesign/homepage-public
ACCEPTANCE_CRITERIA=
- section explains upload -> artwork library -> awards submission
- primary CTA goes to /artworks/upload
- secondary CTA goes to /awards
- mobile layout remains readable
COMMANDS_TO_RUN=npm run verify
PREVIEW_EXPECTATION=open / and show the updated section
```

## Bad First Task Example

```txt
TASK_ID=A-CRUD-001
TARGET_ROUTE=/admin/users
TARGET_SCOPE=full user permissions CRUD
```

This is too risky for the first automation MVP because it touches auth, permissions, destructive updates, and production-like data boundaries.
