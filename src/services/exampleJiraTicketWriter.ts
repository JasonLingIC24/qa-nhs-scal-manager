import * as fs from "fs";

import { ScalRequirement } from "../models/scalRequirement.js";

export class ExampleJiraTicketWriter {
  write(requirement: ScalRequirement): void {
    const lines: string[] = [];

    const assessmentStatus = requirement.currentResponse?.trim()
      ? "Response Present"
      : "Response Required";

    lines.push(`# ${requirement.reference}`);

    lines.push("");

    lines.push(`## ${requirement.title}`);
    lines.push("");

    lines.push("## SCAL Requirement");
    lines.push("");

    lines.push("| Field | Value |");
    lines.push("|--------|--------|");
    lines.push(`| SCAL Reference | ${requirement.reference} |`);
    lines.push(`| Title | ${requirement.title} |`);
    lines.push(`| Functional Area | ${requirement.functionalArea ?? ""} |`);
    lines.push(`| Assessment Status | ${assessmentStatus} |`);

    lines.push("");

    lines.push("## Existing SCAL Status");
    lines.push("");

    lines.push("| Field | Value |");
    lines.push("|--------|--------|");
    lines.push(`| Answered | ${requirement.isAnswered ? "Yes" : "No"} |`);
    lines.push(
      `| Current Response | ${
        requirement.currentResponse?.trim() ? "Present" : "Not Supplied"
      } |`,
    );

    lines.push("");

    lines.push("## Question");
    lines.push("");
    lines.push(requirement.question);
    lines.push("");

    if (requirement.supportingInformation) {
      lines.push("## Supporting Information");
      lines.push("");
      lines.push(requirement.supportingInformation);
      lines.push("");
    }

    lines.push("## Available Responses");
    lines.push("");

    requirement.responseOptions.forEach((option) => {
      lines.push(`- ${option}`);
    });

    lines.push("");

    lines.push("## Current SCAL Response");
    lines.push("");

    lines.push("```");
    lines.push(requirement.currentResponse || "No response supplied");
    lines.push("```");

    lines.push("");

    lines.push("## Developer Response");
    lines.push("");
    lines.push("Response:");
    lines.push("");
    lines.push("[TBD]");
    lines.push("");

    lines.push("Explanation:");
    lines.push("");
    lines.push("[TBD]");
    lines.push("");

    lines.push("## Developer Notes");
    lines.push("");
    lines.push("[TBD]");
    lines.push("");

    lines.push("## QA Notes");
    lines.push("");
    lines.push("[TBD]");
    lines.push("");

    lines.push("## Acceptance Criteria");
    lines.push("");
    lines.push("- Requirement reviewed");
    lines.push("- Developer response provided");
    lines.push("- Returned to QA");
    lines.push("- Ready for SCAL review");

    fs.writeFileSync(
      "data/output/example-jira-ticket.md",
      lines.join("\n"),
      "utf8",
    );

    console.log("Wrote: data/output/example-jira-ticket.md");
  }
}
