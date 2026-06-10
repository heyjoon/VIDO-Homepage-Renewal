import type { OrchestrationTask } from "../types.js";

export function buildQaPrompt(task: OrchestrationTask): string {
  return [
    "You are the VIDO QA Reviewer Agent.",
    "",
    "Read:",
    "1. AGENTS.md",
    "2. .codex/agents/qa-reviewer.md",
    "",
    "Review the current branch diff for this task:",
    `TASK_ID=${task.id}`,
    `AREA=${task.area}`,
    `TITLE=${task.title}`,
    "",
    "Acceptance criteria:",
    ...task.acceptanceCriteria.map((criterion) => `- ${criterion}`),
    "",
    "Review requirements:",
    "- Do not edit files.",
    "- Check whether changed files match scope.",
    "- Check verification output if available.",
    "- Identify mock-only behavior, backend assumptions, auth gaps, layout risks, and deployment risks.",
    "- Confirm whether a visible result was provided.",
    "",
    "Final output:",
    "QA result: pass / pass with risk / fail",
    "Changed scope:",
    "Verification:",
    "Risks:",
    "Shown result:",
  ].join("\n");
}
