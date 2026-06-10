import type { ExecRequest, ExecResult } from "../types.js";
import type { AgentExecutor } from "./executor.js";

/**
 * Boundary for the final orchestration stage.
 *
 * Keep this adapter isolated so the MVP can run on Codex CLI today while the
 * future implementation can replace `CodexCliExecutor` with Agents SDK + Codex
 * MCP without rewriting planner/developer/QA task logic.
 */
export class AgentsSdkExecutor implements AgentExecutor {
  async run(_request: ExecRequest): Promise<ExecResult> {
    throw new Error(
      "AgentsSdkExecutor is a reserved adapter. Wire it after the Agents SDK and Codex MCP server are configured for this repo.",
    );
  }
}
