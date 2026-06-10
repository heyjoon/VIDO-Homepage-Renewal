import type { ExecRequest, ExecResult } from "../types.js";

export interface AgentExecutor {
  run(request: ExecRequest): Promise<ExecResult>;
}
