import * as fs from "fs";

import { ScalRequirement } from "../models/scalRequirement.js";

export class JiraSubtaskCsvWriter {
  write(requirements: ScalRequirement[]): void {
    const rows: string[] = [];

    rows.push(
      ["Issue Type", "Summary", "Description", "Parent", "Labels"].join(","),
    );

    requirements.forEach((requirement) => {
      const shortRef = requirement.reference.replace("PDS-FHIR-", "");

      rows.push(
        [
          this.escape("Sub-task"),
          this.escape(`[${shortRef}] - ${requirement.title}`),
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

    const assessmentStatus = requirement.currentResponse?.trim()
      ? "Response Present"
      : "Response Required";

    lines.push("h2. SCAL Requirement");
    lines.push("");

    lines.push("||Field||Value||");
    lines.push(`|SCAL Reference|${requirement.reference}|`);
    lines.push(`|Title|${requirement.title}|`);
    lines.push(`|Functional Area|${requirement.functionalArea ?? ""}|`);
    lines.push(`|Assessment Status|${assessmentStatus}|`);

    lines.push("");

    lines.push("h2. Existing SCAL Status");
    lines.push("");

    lines.push("||Field||Value||");
    lines.push(`|Answered|${requirement.isAnswered ? "Yes" : "No"}|`);
    lines.push(
      `|Current Response|${
        requirement.currentResponse?.trim() ? "Present" : "Not Supplied"
      }|`,
    );

    lines.push("");

    lines.push("h2. Question");
    lines.push("");
    lines.push(requirement.question);

    lines.push("");

    if (requirement.supportingInformation) {
      lines.push("h2. Supporting Information");

      lines.push("");
      lines.push(requirement.supportingInformation);

      lines.push("");
    }

    lines.push("h2. Available Responses");

    lines.push("");

    requirement.responseOptions.forEach((option) => {
      lines.push(`* ${option}`);
    });

    lines.push("");

    lines.push("h2. Current SCAL Response");
    lines.push("");

    if (requirement.currentResponse && requirement.currentResponse.trim()) {
      lines.push("{panel:bgColor=#E3FCEF}");
      lines.push(requirement.currentResponse);
      lines.push("{panel}");
    } else {
      lines.push("{panel:bgColor=#FFEBE6}");
      lines.push("No response supplied");
      lines.push("{panel}");
    }

    lines.push("");

    if (requirement.currentResponse && requirement.currentResponse.trim()) {
      lines.push(`{panel:bgColor=#E3FCEF}`);
      lines.push(requirement.currentResponse);
      lines.push("{panel}");
    } else {
      lines.push("{panel:bgColor=#FFEBE6}");
      lines.push("No response supplied");
      lines.push("{panel}");
    }

    lines.push("");

    lines.push("h2. Response");

    lines.push("");

    lines.push("Please provide:");

    lines.push("");

    lines.push("* Proposed SCAL response");
    lines.push("* Explanation of current behaviour");
    lines.push("* Any assumptions or limitations");

    lines.push("");

    lines.push("Response:");

    lines.push("");

    lines.push("{color:#FF5630}[TBD]{color}");

    lines.push("");

    lines.push("h2. Notes");

    lines.push("");

    lines.push("{color:#FF5630}[TBD]{color}");

    lines.push("");

    lines.push("h2. QA Notes");

    lines.push("");

    lines.push("{color:#FF5630}[TBD]{color}");

    lines.push("");

    lines.push("h2. Acceptance Criteria");

    lines.push("");

    lines.push("* Requirement reviewed");
    lines.push("* Developer response provided");
    lines.push("* Returned to QA");
    lines.push("* Ready for SCAL submission review");

    return lines.join("\n");
  }

  private escape(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
  }
}
