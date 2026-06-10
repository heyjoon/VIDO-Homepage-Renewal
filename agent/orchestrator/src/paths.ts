import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function getDefaultRepoRoot(): string {
  const currentFile = fileURLToPath(import.meta.url);
  return resolve(dirname(currentFile), "..", "..", "..");
}

export function shellQuote(value: string): string {
  return JSON.stringify(value);
}
