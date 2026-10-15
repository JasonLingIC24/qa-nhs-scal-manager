import * as fs from "fs";

import { ScalRequirement } from "../models/scalRequirement.js";

export class JiraSubtaskPreviewWriter {
  write(requirements: ScalRequirement[]): void {
    const lines: string[] = [];

    lines.push("# Jira Sub-task Preview");
    lines.push("");
    lines.push("Parent Story: EVA-2583");
    lines.push("");
    lines.push(`Total Sub-tasks: ${requirements.length}`);
    lines.push("");

    requirements.forEach((requirement) => {
      lines.push("---");
      lines.push("");

      lines.push(`## ${requirement.reference} - ${requirement.title}`);

      lines.push("");

      lines.push(`Functional Area: ${requirement.functionalArea}`);

      lines.push("");

      lines.push("Question:");
      lines.push(requirement.question);

      lines.push("");

      if (requirement.currentResponse) {
        lines.push(`Current SCAL Response: ${requirement.currentResponse}`);

        lines.push("");
      }
    });

    fs.mkdirSync("data/output", {
      recursive: true,
    });

    fs.writeFileSync(
      "data/output/jira-subtask-preview.md",
      lines.join("\n"),
      "utf8",
    );

    console.log("Wrote: data/output/jira-subtask-preview.md");
  }
}
