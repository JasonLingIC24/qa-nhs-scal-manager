import * as fs from "fs";

import { ScalRequirement } from "../models/scalRequirement.js";
import { TaskTitleGenerator } from "./taskTitleGenerator.js";

interface StoryDefinition {
  key: string;
  summary: string;
  areas: string[];
}

export class JiraCsvWriter {
  write(requirements: ScalRequirement[]): void {
    const stories = this.getStoryDefinitions();
    const titleGenerator = new TaskTitleGenerator();
    const rows: string[] = [];

    rows.push(
      [
        "Issue Type",
        "Summary",
        "Description",
        "Parent",
        "Labels",
        "Story Key",
      ].join(","),
    );

    //
    // Stories
    //
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
          this.escape(story.key),
        ].join(","),
      );
    });

    //
    // Tasks
    //
    stories.forEach((story) => {
      const storyRequirements = requirements.filter((requirement) =>
        story.areas.includes(requirement.functionalArea ?? ""),
      );

      storyRequirements.forEach((requirement) => {
        rows.push(
          [
            this.escape("Sub-task"),
            this.escape(`${requirement.reference} - ${requirement.title}`),
            this.escape(this.buildTaskDescription(requirement)),
            this.escape(story.key),
            this.escape(`SCAL,PDS`),
            this.escape(""),
          ].join(","),
        );
      });
    });

    fs.mkdirSync("data/output", {
      recursive: true,
    });

    fs.writeFileSync("data/output/jira-import.csv", rows.join("\n"), "utf8");

    console.log("Wrote: data/output/jira-import.csv");
  }

  private getStoryDefinitions(): StoryDefinition[] {
    return [
      {
        key: "SCAL-NUMALLOC",
        summary: "[SCAL] NHS Number Allocation",
        areas: ["NHS Number Allocation"],
      },
      {
        key: "SCAL-HWA",
        summary: "[SCAL] Healthcare Worker Access & Security",
        areas: [
          "Healthcare Worker Access",
          "Healthcare Worker Access & Security",
        ],
      },
      {
        key: "SCAL-SENSITIVE",
        summary: "[SCAL] Sensitive & Invalid Patient Handling",
        areas: ["Sensitive Patients", "Super Sensitive Patients"],
      },
      {
        key: "SCAL-SYNC",
        summary: "[SCAL] PDS Search & Synchronisation",
        areas: [
          "PDS Synchronisation",
          "Patient Search & Results Handling",
          "Synchronisation",
        ],
      },
      {
        key: "SCAL-UPDATES",
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
        key: "SCAL-TRACE",
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

    lines.push(
      "This story supports completion of the NHS PDS/SCR SCAL assessment.",
    );
    lines.push("");
    lines.push(`Requirements included: ${requirements.length}`);
    lines.push("");
    lines.push("The individual SCAL requirements are tracked in child tasks.");
    lines.push("");
    lines.push("References:");
    lines.push("");

    requirements.forEach((requirement) => {
      lines.push(`- ${requirement.reference}`);
    });

    return lines.join("\n");
  }

  private buildTaskDescription(requirement: ScalRequirement): string {
    const lines: string[] = [];

    lines.push("SCAL Reference");
    lines.push("");
    lines.push(requirement.reference);
    lines.push("");

    lines.push("Question");
    lines.push("");
    lines.push(requirement.question);
    lines.push("");

    if (requirement.supportingInformation) {
      lines.push("Supporting Information");
      lines.push("");
      lines.push(requirement.supportingInformation);
      lines.push("");
    }

    lines.push("Available Responses");
    lines.push("");

    requirement.responseOptions.forEach((option) => {
      lines.push(`- ${option}`);
    });

    lines.push("");

    if (requirement.currentResponse) {
      lines.push(`Current SCAL Response: ${requirement.currentResponse}`);
      lines.push("");
    }

    lines.push("Developer Response");
    lines.push("");
    lines.push("[TBD]");
    lines.push("");

    lines.push("Developer Notes");
    lines.push("");
    lines.push("[TBD]");
    lines.push("");

    lines.push("QA Notes");
    lines.push("");
    lines.push("[TBD]");
    lines.push("");

    lines.push("Acceptance Criteria");
    lines.push("");
    lines.push("- Requirement reviewed");
    lines.push("- Response provided");
    lines.push("- Returned to QA for submission");

    return lines.join("\n");
  }

  private truncate(value: string, maxLength: number): string {
    if (value.length <= maxLength) {
      return value;
    }

    return `${value.substring(0, maxLength - 3)}...`;
  }

  private escape(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
  }
}
