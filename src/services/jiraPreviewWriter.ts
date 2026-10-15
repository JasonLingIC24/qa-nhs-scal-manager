import * as fs from "fs";

import { ScalRequirement } from "../models/scalRequirement.js";

interface StoryDefinition {
  summary: string;
  areas: string[];
}

export class JiraPreviewWriter {
  write(requirements: ScalRequirement[]): void {
    const stories = this.getStoryDefinitions();

    const lines: string[] = [];

    lines.push("# SCAL Jira Story Preview");
    lines.push("");
    lines.push("Parent: EVA-2583");
    lines.push("");
    lines.push(`Generated from ${requirements.length} SCAL requirements`);
    lines.push("");

    stories.forEach((story) => {
      const storyRequirements = requirements.filter((requirement) =>
        story.areas.includes(requirement.functionalArea ?? ""),
      );

      if (storyRequirements.length === 0) {
        return;
      }

      lines.push("---");
      lines.push("");
      lines.push(`## ${story.summary}`);
      lines.push("");

      lines.push(`Requirements: ${storyRequirements.length}`);
      lines.push("");

      storyRequirements.forEach((requirement) => {
        lines.push(`### ${requirement.reference} - ${requirement.title}`);

        lines.push("");

        lines.push(requirement.question);

        lines.push("");

        if (requirement.currentResponse) {
          lines.push(`Current SCAL Response: ${requirement.currentResponse}`);

          lines.push("");
        }
      });

      lines.push("");
    });

    fs.mkdirSync("data/output", { recursive: true });

    fs.writeFileSync(
      "data/output/jira-story-preview.md",
      lines.join("\n"),
      "utf8",
    );

    console.log("Wrote: data/output/jira-story-preview.md");
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
}
