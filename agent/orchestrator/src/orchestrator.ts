import { buildDeveloperPrompt } from "./agents/developer.js";
import { planNextTask } from "./agents/planner.js";
import { buildQaPrompt } from "./agents/qa.js";
import type { AgentExecutor } from "./executors/executor.js";
import { loadTasks } from "./task-store.js";
import type { OrchestrationResult } from "./types.js";

export interface OrchestrateOptions {
  repoRoot: string;
  taskId?: string;
  developerOnly?: boolean;
}

export async function orchestrate(
  executor: AgentExecutor,
  options: OrchestrateOptions,
): Promise<OrchestrationResult> {
  const tasks = await loadTasks(options.repoRoot);
  const planner = planNextTask(tasks, options.taskId);
  const developerPrompt = buildDeveloperPrompt(planner.task);

  const developer = await executor.run({
    agentName: "Developer Agent",
    sandbox: "workspace-write",
    prompt: developerPrompt,
  });

  const qa = options.developerOnly
    ? {
        agentName: "QA Reviewer Agent",
        ok: true,
        stdout: "Skipped because --developer-only was set.",
        stderr: "",
      }
    : await executor.run({
        agentName: "QA Reviewer Agent",
        sandbox: "read-only",
        prompt: buildQaPrompt(planner.task),
      });

  return {
    planner,
    developer,
    qa,
  };
}
