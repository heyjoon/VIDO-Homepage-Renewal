import type { OrchestrationTask, PlannerDecision } from "../types.js";

const LOW_RISK_AREAS = new Set(["homepage", "user-pages", "awards"]);
const HIGH_RISK_PATTERNS = [/admin\/users/i, /permission/i, /auth/i, /CRUD/i, /delete/i, /billing/i];

export function planNextTask(tasks: OrchestrationTask[], requestedTaskId?: string): PlannerDecision {
  const candidates = tasks.filter((task) => task.status === "todo");
  const requested = requestedTaskId
    ? candidates.find((task) => task.id === requestedTaskId)
    : undefined;

  if (requestedTaskId && !requested) {
    throw new Error(`Task ${requestedTaskId} was not found or is not todo.`);
  }

  const task = requested ?? candidates.find(isPreferredMvpTask) ?? candidates[0];

  if (!task) {
    throw new Error("No todo tasks found.");
  }

  const riskLevel = classifyRisk(task);
  return {
    task,
    riskLevel,
    reason: requested
      ? `User requested ${requested.id}.`
      : `Selected ${task.id} as the next low-risk MVP task.`,
  };
}

function isPreferredMvpTask(task: OrchestrationTask): boolean {
  return LOW_RISK_AREAS.has(task.area) && classifyRisk(task) === "low";
}

function classifyRisk(task: OrchestrationTask): PlannerDecision["riskLevel"] {
  const text = `${task.area} ${task.id} ${task.title} ${task.acceptanceCriteria.join(" ")}`;

  if (HIGH_RISK_PATTERNS.some((pattern) => pattern.test(text))) {
    return "high";
  }

  if (task.area.includes("admin")) {
    return "medium";
  }

  return "low";
}
