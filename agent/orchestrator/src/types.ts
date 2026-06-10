export type TaskStatus = "todo" | "in_progress" | "blocked" | "done";

export type AgentRole =
  | "Planner Agent"
  | "Page Renewal Worker"
  | "Homepage Worker"
  | "Awards Worker"
  | "User Page Worker"
  | "Admin Worker"
  | "QA Reviewer";

export interface RawTask {
  id: string;
  title: string;
  status: TaskStatus;
  role: AgentRole | string;
  acceptanceCriteria: string[];
}

export interface TaskQueueFile {
  area: string;
  branch: string;
  tasks: RawTask[];
}

export interface OrchestrationTask extends RawTask {
  area: string;
  branch: string;
  sourceFile: string;
}

export interface PlannerDecision {
  task: OrchestrationTask;
  reason: string;
  riskLevel: "low" | "medium" | "high";
}

export interface ExecutorOptions {
  repoRoot: string;
  dryRun: boolean;
}

export interface ExecRequest {
  agentName: string;
  sandbox: "workspace-write" | "read-only";
  prompt: string;
}

export interface ExecResult {
  agentName: string;
  ok: boolean;
  command?: string;
  stdout: string;
  stderr: string;
}

export interface OrchestrationResult {
  planner: PlannerDecision;
  developer: ExecResult;
  qa: ExecResult;
}
