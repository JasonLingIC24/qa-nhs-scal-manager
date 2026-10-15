import * as fs from "fs";

import { ScalRequirement } from "../models/scalRequirement.js";

interface StoryDefinition {
  summary: string;
  areas: string[];
}

export class JiraStoriesCsvWriter {
  write(requirements: ScalRequirement[]): void {
    const stories = this.getStoryDefinitions();

    const rows: string[] = [];

    rows.push(
      ["Issue Type", "Summary", "Description", "Parent", "Labels"].join(","),
    );

    stories.forEach((story) => {
      const storyRequirements = requirements.filter((requirement) =>
        story.areas.includes(requirement.functionalArea ?? ""),
      );

      if (storyRequirements.length === 0) {
        return;
      }

      rows.push(
        [
          this.escape("Story"),
          this.escape(story.summary),
          this.escape(
            this.buildStoryDescription(story.summary, storyRequirements),
          ),
          this.escape("EVA-2583"),
          this.escape("SCAL,PDS,NHS"),
        ].join(","),
      );
    });

    fs.mkdirSync("data/output", {
      recursive: true,
    });

    fs.writeFileSync("data/output/jira-stories.csv", rows.join("\n"), "utf8");

    console.log("Wrote: data/output/jira-stories.csv");
  }

  private getStoryDefinitions(): StoryDefinition[] {
    return [
      {
        summary: "[SCAL] NHS Number Allocation",
        areas: ["NHS Number Allocation"],
      },
      {
        summary: "[SCAL] Healthcare Worker Access & Security",
        areas: [
          "Healthcare Worker Access",
          "Healthcare Worker Access & Security",
        ],
      },
      {
        summary: "[SCAL] Sensitive & Invalid Patient Handling",
        areas: ["Sensitive Patients", "Super Sensitive Patients"],
      },
      {
        summary: "[SCAL] PDS Search & Synchronisation",
        areas: [
          "PDS Synchronisation",
          "Patient Search & Results Handling",
          "Synchronisation",
        ],
      },
      {
        summary: "[SCAL] Patient Demographics & Updates",
        areas: [
          "Patient Demographics & Updates",
          "Address Updates",
          "Death Updates",
          "Demographic Updates",
          "Failure Handling",
          "GP Updates",
          "Language Updates",
          "Physical Updates",
          "General Updates",
          "Patient Updates",
        ],
      },
      {
        summary: "[SCAL] Tracing & Confidentiality",
        areas: ["Tracing & Confidentiality"],
      },
    ];
  }

  private buildStoryDescription(
    summary: string,
    requirements: ScalRequirement[],
  ): string {
    const lines: string[] = [];

    lines.push("Background");
    lines.push("");

    lines.push(
      "This story supports completion of the NHS PDS/SCR SCAL assessment.",
    );

    lines.push("");
    lines.push("Parent Story");
    lines.push("EVA-2583");

    lines.push("");
    lines.push("Requirements Included");

    lines.push("");

    requirements.forEach((requirement) => {
      lines.push(`• ${requirement.reference} - ${requirement.title}`);
    });

    lines.push("");
    lines.push("Acceptance Criteria");
    lines.push("");
    lines.push(`• ${requirements.length} SCAL requirements reviewed`);
    lines.push("• Child tasks created and assigned");
    lines.push("• Responses supplied to QA");

    return lines.join("\n");
  }

  private escape(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
  }
}
