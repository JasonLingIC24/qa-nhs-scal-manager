import * as fs from "fs";

import { ScalRequirement } from "../models/scalRequirement.js";

export class JiraSubtaskCsvWriter {
  write(requirements: ScalRequirement[]): void {
    const rows: string[] = [];

    rows.push(
      ["Issue Type", "Summary", "Description", "Parent", "Labels"].join(","),
    );

    requirements.forEach((requirement) => {
      rows.push(
        [
          this.escape("Sub-task"),
          this.escape(`${requirement.reference} - ${requirement.title}`),
          this.escape(this.buildDescription(requirement)),
          this.escape("EVA-2583"),
          this.escape(`SCAL,PDS`),
        ].join(","),
      );
    });

    fs.mkdirSync("data/output", {
      recursive: true,
    });

    fs.writeFileSync("data/output/jira-subtasks.csv", rows.join("\n"), "utf8");

    console.log("Wrote: data/output/jira-subtasks.csv");
  }

  private buildDescription(requirement: ScalRequirement): string {
    const lines: string[] = [];

    lines.push("SCAL Requirement");
    lines.push("");

    lines.push(`Reference: ${requirement.reference}`);
    lines.push("");

    lines.push("Functional Area");
    lines.push(requirement.functionalArea ?? "");
    lines.push("");

    lines.push("Question");
    lines.push(requirement.question);
    lines.push("");

    if (requirement.supportingInformation) {
      lines.push("Supporting Information");
      lines.push(requirement.supportingInformation);
      lines.push("");
    }

    lines.push("Available Responses");

    requirement.responseOptions.forEach((option) => {
      lines.push(`- ${option}`);
    });

    lines.push("");

    if (requirement.currentResponse) {
      lines.push(`Current SCAL Response: ${requirement.currentResponse}`);
      lines.push("");
    }

    lines.push("Response");
    lines.push("[TBD]");
    lines.push("");

    lines.push("Notes");
    lines.push("[TBD]");
    lines.push("");

    lines.push("QA Notes");
    lines.push("[TBD]");
    lines.push("");

    lines.push("Acceptance Criteria");
    lines.push("- Requirement reviewed");
    lines.push("- Response completed");
    lines.push("- Returned to QA");

    return lines.join("\n");
  }

  private escape(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
  }
}
