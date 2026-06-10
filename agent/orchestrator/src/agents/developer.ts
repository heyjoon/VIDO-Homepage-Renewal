import type { OrchestrationTask } from "../types.js";

export function buildDeveloperPrompt(task: OrchestrationTask): string {
  return [
    "You are the VIDO Developer Agent.",
    "",
    "Read these files before editing:",
    "1. AGENTS.md",
    "2. .codex/agents/page-renewal-worker.md",
    "3. docs/redesign/00-product-goals.md",
    "4. docs/redesign/02-design-system.md",
    "",
    "Task:",
    `TASK_ID=${task.id}`,
    `AREA=${task.area}`,
    `BRANCH_SCOPE=${task.branch}`,
    `TITLE=${task.title}`,
    "",
    "Acceptance criteria:",
    ...task.acceptanceCriteria.map((criterion) => `- ${criterion}`),
    "",
    "Rules:",
    "- Implement only this task.",
    "- Inspect route/component files before editing.",
    "- Do not broaden into auth, permissions, destructive CRUD, or unrelated routes.",
    "- Preserve existing user changes.",
    "- Run available verification commands, preferring npm run verify when present.",
    "- End with changed files, verification, risks, and a visible result link or route.",
  ].join("\n");
}
