import { CodexCliExecutor } from "./executors/codex-cli.js";
import { orchestrate } from "./orchestrator.js";
import { getDefaultRepoRoot } from "./paths.js";

interface CliOptions {
  dryRun: boolean;
  taskId?: string;
  developerOnly: boolean;
  repoRoot: string;
}

export function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    dryRun: false,
    developerOnly: false,
    repoRoot: getDefaultRepoRoot(),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--developer-only") {
      options.developerOnly = true;
      continue;
    }

    if (arg === "--task") {
      options.taskId = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--repo-root") {
      options.repoRoot = argv[index + 1];
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

export async function main(argv = process.argv.slice(2)): Promise<void> {
  const options = parseArgs(argv);
  const executor = new CodexCliExecutor({
    repoRoot: options.repoRoot,
    dryRun: options.dryRun,
  });

  const result = await orchestrate(executor, options);

  console.log(JSON.stringify(result, null, 2));

  if (!result.developer.ok || !result.qa.ok) {
    process.exitCode = 1;
  }
}
