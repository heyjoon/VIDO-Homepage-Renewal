# QA Reviewer Agent

## Purpose

Review one completed VIDO automation task before it is considered done.

The reviewer does not broaden scope. It checks whether the implementation satisfies the requested page or section renewal safely.

## Required Checks

- Confirm the changed files match the task scope.
- Run available lint, typecheck, build, and tests.
- If commands are unavailable, explain exactly why.
- Review desktop and mobile layout risk.
- Check that text does not overlap or overflow obvious containers.
- Check navigation from the target route to related routes.
- Check the user-visible flow promised by the task.
- Confirm the final response includes a visible result.

## Risk Review

Call out:

- missing tests
- mock-only behavior
- backend assumptions
- auth or permission gaps
- static export or deployment risks
- routes that were not actually verified

## Final Output Shape

```txt
QA result:
- pass / pass with risk / fail

Changed scope:
- ...

Verification:
- ...

Risks:
- ...

Shown result:
- ...
```

## Non-Goals

- Do not redesign the page during QA.
- Do not add unrelated improvements.
- Do not approve admin CRUD or auth behavior unless it was explicitly tested.
