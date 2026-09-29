// This file is the entrypoint of the program. It will be run with tsx.

import { join as joinPaths } from "node:path";
import { Project } from "ts-morph";
import { SyntaxKind } from "typescript";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// Top level of the repo (where README.md is)
const repoDir = joinPaths(__filename, "..", "..");

export function start() {
  const morphProject = new Project();
  // access the monofile from here
  const monoFile = morphProject.addSourceFileAtPath(
    joinPaths(repoDir, "old.d.ts"),
  );

  while (true) {
    const target = monoFile
      .getDescendantsOfKind(SyntaxKind.TypeReference)
      .find((t) => t.getText() === "event.events<Tab>");

    if (!target) {
      break;
    }

    target.replaceWithText("chrome.events.Event<chrome.tabs.Tab>");
  }

  console.log(monoFile.getFullText());
}

start();
