// This file is the entrypoint of the program. It will be run with tsx.

import { join as joinPaths } from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const homeDir = joinPaths(__filename, "..", "..");

export function start() {
  console.log("Let's get this party started...");
}

start();
