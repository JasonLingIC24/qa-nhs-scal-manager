import ExcelJS from "exceljs";

import { ScalRequirement } from "../models/scalRequirement.js";

export class SpreadsheetWriter {
  async write(requirements: ScalRequirement[]): Promise<void> {
    const workbook = new ExcelJS.Workbook();

    //
    // Requirements Sheet
    //
    const worksheet = workbook.addWorksheet("Requirements");

    worksheet.columns = [
      {
        header: "Functional Area",
        key: "functionalArea",
        width: 30,
      },
      {
        header: "SCAL Reference",
        key: "reference",
        width: 25,
      },
      {
        header: "Title",
        key: "title",
        width: 40,
      },
      {
        header: "Question",
        key: "question",
        width: 80,
      },
      {
        header: "Supporting Information",
        key: "supportingInformation",
        width: 100,
      },
      {
        header: "Current Response",
        key: "currentResponse",
        width: 20,
      },
      {
        header: "Response Options",
        key: "responseOptions",
        width: 30,
      },
      {
        header: "Developer Response",
        key: "developerResponse",
        width: 25,
      },
      {
        header: "Developer Notes",
        key: "developerNotes",
        width: 50,
      },
      {
        header: "Assignee",
        key: "assignee",
        width: 20,
      },
      {
        header: "Jira Story",
        key: "jiraStory",
        width: 30,
      },
      {
        header: "Status",
        key: "status",
        width: 20,
      },
      {
        header: "QA Reviewed",
        key: "qaReviewed",
        width: 15,
      },
    ];

    requirements.forEach((requirement) => {
      worksheet.addRow({
        functionalArea: requirement.functionalArea ?? "",
        reference: requirement.reference,
        title: requirement.title,
        question: requirement.question,
        supportingInformation: requirement.supportingInformation,
        currentResponse: requirement.currentResponse ?? "",
        responseOptions: requirement.responseOptions.join(", "),
        developerResponse: "",
        developerNotes: "",
        assignee: "",
        jiraStory: "",
        status: requirement.status ?? "Not Started",
        qaReviewed: "No",
      });
    });

    const requirementsHeader = worksheet.getRow(1);

    requirementsHeader.font = {
      bold: true,
      color: { argb: "FFFFFF" },
    };

    requirementsHeader.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    worksheet.views = [
      {
        state: "frozen",
        xSplit: 2,
        ySplit: 1,
      },
    ];

    worksheet.autoFilter = {
      from: "A1",
      to: "L1",
    };

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        return;
      }

      row.alignment = {
        vertical: "top",
        wrapText: true,
      };
    });

    for (let row = 2; row <= worksheet.rowCount; row++) {
      worksheet.getCell(`K${row}`).dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: [
          '"Not Started,Assigned,In Progress,Ready For QA,QA Reviewing,Complete"',
        ],
      };

      worksheet.getCell(`L${row}`).dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: ['"No,Yes"'],
      };
    }

    //
    // Build Functional Area Counts
    //
    const areaCounts = new Map<string, number>();

    requirements.forEach((requirement) => {
      const area = requirement.functionalArea ?? "Uncategorised";

      areaCounts.set(area, (areaCounts.get(area) ?? 0) + 1);
    });

    //
    // Summary Sheet
    //
    const summarySheet = workbook.addWorksheet("Summary");

    summarySheet.columns = [
      {
        header: "Functional Area",
        key: "functionalArea",
        width: 40,
      },
      {
        header: "Requirement Count",
        key: "count",
        width: 20,
      },
    ];

    const sortedAreas = [...areaCounts.entries()].sort((a, b) =>
      a[0].localeCompare(b[0]),
    );

    sortedAreas.forEach(([area, count]) => {
      summarySheet.addRow({
        functionalArea: area,
        count,
      });
    });

    summarySheet.addRow({});

    summarySheet.addRow({
      functionalArea: "TOTAL",
      count: requirements.length,
    });

    const summaryHeader = summarySheet.getRow(1);

    summaryHeader.font = {
      bold: true,
      color: { argb: "FFFFFF" },
    };

    summaryHeader.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    summarySheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    summarySheet.autoFilter = {
      from: "A1",
      to: "B1",
    };

    //
    // Story Planning Sheet
    //
    const storySheet = workbook.addWorksheet("Story Planning");

    storySheet.columns = [
      {
        header: "Functional Area",
        key: "functionalArea",
        width: 40,
      },
      {
        header: "Requirement Count",
        key: "count",
        width: 20,
      },
      {
        header: "Suggested Story",
        key: "story",
        width: 50,
      },
    ];

    sortedAreas.forEach(([area, count]) => {
      storySheet.addRow({
        functionalArea: area,
        count,
        story: `[SCAL] ${area}`,
      });
    });

    const storyHeader = storySheet.getRow(1);

    storyHeader.font = {
      bold: true,
      color: { argb: "FFFFFF" },
    };

    storyHeader.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    storySheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    storySheet.autoFilter = {
      from: "A1",
      to: "C1",
    };

    //
    // Jira Story Descriptions
    //
    const jiraSheet = workbook.addWorksheet("Jira Story Descriptions");

    jiraSheet.columns = [
      {
        header: "Story Name",
        key: "storyName",
        width: 40,
      },
      {
        header: "Description",
        key: "description",
        width: 150,
      },
    ];

    sortedAreas.forEach(([area]) => {
      const areaRequirements = requirements.filter(
        (requirement) =>
          (requirement.functionalArea ?? "Uncategorised") === area,
      );

      const descriptionLines: string[] = [];

      descriptionLines.push(
        "Background",
        "",
        "This story supports completion of the NHS PDS/SCR SCAL assessment.",
        "",
        "Parent:",
        "EVA-2583",
        "",
        "Requirements",
        "",
      );

      areaRequirements.forEach((requirement) => {
        descriptionLines.push(
          `Reference: ${requirement.reference}`,
          "",
          `Question: ${requirement.question}`,
          "",
        );

        if (requirement.supportingInformation) {
          descriptionLines.push(
            "Supporting Information:",
            requirement.supportingInformation,
            "",
          );
        }

        descriptionLines.push(
          "Possible Responses:",
          ...requirement.responseOptions.map((option) => `- ${option}`),
          "",
          "Developer Response:",
          "[TBD]",
          "",
          "Notes:",
          "[TBD]",
          "",
          "--------------------------------------------------",
          "",
        );
      });

      jiraSheet.addRow({
        storyName: `[SCAL] ${area}`,
        description: descriptionLines.join("\n"),
      });
    });

    const jiraHeader = jiraSheet.getRow(1);

    jiraHeader.font = {
      bold: true,
      color: { argb: "FFFFFF" },
    };

    jiraHeader.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    jiraSheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    jiraSheet.autoFilter = {
      from: "A1",
      to: "B1",
    };

    //
    // Uncategorised Requirements
    //
    const uncategorisedSheet = workbook.addWorksheet(
      "Uncategorised Requirements",
    );

    uncategorisedSheet.columns = [
      {
        header: "SCAL Reference",
        key: "reference",
        width: 30,
      },
      {
        header: "Question",
        key: "question",
        width: 100,
      },
      {
        header: "Current Response",
        key: "response",
        width: 20,
      },
    ];

    requirements
      .filter((r) => !r.functionalArea || r.functionalArea === "Uncategorised")
      .forEach((r) => {
        uncategorisedSheet.addRow({
          reference: r.reference,
          question: r.question,
          response: r.currentResponse ?? "",
        });
      });

    const uncategorisedHeader = uncategorisedSheet.getRow(1);

    uncategorisedHeader.font = {
      bold: true,
      color: { argb: "FFFFFF" },
    };

    uncategorisedHeader.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "C00000" },
    };

    uncategorisedSheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    uncategorisedSheet.autoFilter = {
      from: "A1",
      to: "C1",
    };

    //
    // Reference Prefix Analysis
    //
    const prefixSheet = workbook.addWorksheet("Reference Prefix Analysis");

    prefixSheet.columns = [
      {
        header: "Prefix",
        key: "prefix",
        width: 30,
      },
      {
        header: "Count",
        key: "count",
        width: 15,
      },
      {
        header: "Mapped Functional Area",
        key: "mappedArea",
        width: 40,
      },
    ];

    const prefixCounts = new Map<string, number>();

    requirements.forEach((r) => {
      const prefix = this.getPrefix(r.reference);

      prefixCounts.set(prefix, (prefixCounts.get(prefix) ?? 0) + 1);
    });

    [...prefixCounts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([prefix, count]) => {
        const sampleRequirement = requirements.find((r) =>
          r.reference.includes(prefix),
        );

        prefixSheet.addRow({
          prefix,
          count,
          mappedArea: sampleRequirement?.functionalArea ?? "Uncategorised",
        });
      });

    const prefixHeader = prefixSheet.getRow(1);

    prefixHeader.font = {
      bold: true,
      color: { argb: "FFFFFF" },
    };

    prefixHeader.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "1F4E78" },
    };

    prefixSheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    prefixSheet.autoFilter = {
      from: "A1",
      to: "C1",
    };

    const uncategorisedCount = requirements.filter(
      (r) => !r.functionalArea || r.functionalArea === "Uncategorised",
    ).length;

    console.log("");
    console.log(`Requirements: ${requirements.length}`);
    console.log(`Uncategorised: ${uncategorisedCount}`);

    await workbook.xlsx.writeFile("data/output/scal-requirements.xlsx");

    console.log("Wrote: data/output/scal-requirements.xlsx");
  }

  private getPrefix(reference: string): string {
    const match = reference.match(/^PDS-FHIR-([A-Z]+)/);

    return match?.[1] ?? "UNKNOWN";
  }
}
