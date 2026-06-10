import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import type { OrchestrationTask, TaskQueueFile } from "./types.js";

const TASK_DIR = join("agent", "tasks");

export async function loadTasks(repoRoot: string): Promise<OrchestrationTask[]> {
  const taskDir = join(repoRoot, TASK_DIR);
  const files = (await readdir(taskDir)).filter((file) => file.endsWith(".json"));
  const tasks: OrchestrationTask[] = [];

  for (const file of files) {
    const path = join(taskDir, file);
    const raw = await readFile(path, "utf8");
    const queue = JSON.parse(raw) as TaskQueueFile;

    for (const task of queue.tasks) {
      tasks.push({
        ...task,
        area: queue.area,
        branch: queue.branch,
        sourceFile: join(TASK_DIR, file),
      });
    }
  }

  return tasks;
}

export function findTask(tasks: OrchestrationTask[], taskId?: string): OrchestrationTask | undefined {
  if (!taskId) {
    return undefined;
  }

  return tasks.find((task) => task.id === taskId);
}
