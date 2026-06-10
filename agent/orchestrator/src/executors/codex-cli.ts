import { spawn } from "node:child_process";
import type { ExecRequest, ExecResult, ExecutorOptions } from "../types.js";
import type { AgentExecutor } from "./executor.js";

export class CodexCliExecutor implements AgentExecutor {
  constructor(private readonly options: ExecutorOptions) {}

  async run(request: ExecRequest): Promise<ExecResult> {
    const args = ["exec", "--sandbox", request.sandbox, request.prompt];
    const command = `codex ${args.map((arg) => JSON.stringify(arg)).join(" ")}`;

    if (this.options.dryRun) {
      return {
        agentName: request.agentName,
        ok: true,
        command,
        stdout: request.prompt,
        stderr: "",
      };
    }

    return new Promise((resolve) => {
      const child = spawn("codex", args, {
        cwd: this.options.repoRoot,
        shell: process.platform === "win32",
        stdio: ["ignore", "pipe", "pipe"],
      });

      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (chunk: Buffer) => {
        stdout += chunk.toString("utf8");
      });

      child.stderr.on("data", (chunk: Buffer) => {
        stderr += chunk.toString("utf8");
      });

      child.on("close", (code) => {
        resolve({
          agentName: request.agentName,
          ok: code === 0,
          command,
          stdout,
          stderr,
        });
      });

      child.on("error", (error) => {
        resolve({
          agentName: request.agentName,
          ok: false,
          command,
          stdout,
          stderr: `${stderr}\n${error.message}`.trim(),
        });
      });
    });
  }
}
