import * as fs from "fs";
import * as cheerio from "cheerio";

import { ScalRequirement } from "../models/scalRequirement.js";
import { FunctionalAreaMapper } from "./functionalAreaMapper.js";
import { TaskTitleGenerator } from "./taskTitleGenerator.js";

export class ScalParser {
  parse(): ScalRequirement[] {
    const html = fs.readFileSync("data/input/html-scal.html", "utf8");

    const $ = cheerio.load(html);

    const requirements: ScalRequirement[] = [];

    const functionalAreaMapper = new FunctionalAreaMapper();

    const titleGenerator = new TaskTitleGenerator();

    $(
      ".radio-button-question, " +
        ".free-text-question, " +
        ".checkbox-question",
    ).each((_, element) => {
      const container = $(element);

      const isHidden = container.hasClass("form-group__hidden");

      if (isHidden) {
        return;
      }

      const isAnswered = container.attr("data-is-answered") === "true";

      const derivedType =
        container.find('input[id$="__DerivedType"]').val()?.toString() ?? "";

      //
      // Skip NHS informational messages
      //
      if (derivedType === "MessageSectionQuestionView") {
        return;
      }

      const reference = container.find("strong").first().text().trim();

      if (!reference || !reference.startsWith("PDS-FHIR")) {
        return;
      }

      const question = container
        .find("h3, h4")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim();

      let supportingInformation = container
        .find("legend p")
        .map((_, p) => $(p).text().trim())
        .get()
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      //
      // Fallback for supporting information
      //
      if (!supportingInformation) {
        supportingInformation = container
          .find(".supporting-information")
          .text()
          .replace(/\s+/g, " ")
          .trim();
      }

      const responseOptions: string[] = [];

      //
      // Radio buttons
      //
      container.find(".nhsuk-radios__label").each((_, label) => {
        const option = $(label).text().replace(/\s+/g, " ").trim();

        if (option) {
          responseOptions.push(option);
        }
      });

      let currentResponse = "";

      container.find('input[type="radio"]').each((_, radio) => {
        const checked = $(radio).attr("checked") !== undefined;

        if (checked) {
          currentResponse = $(radio).attr("value") ?? "";
        }
      });

      //
      // Checkbox Questions
      //
      const selectedCheckboxes: string[] = [];

      container.find('input[type="checkbox"]').each((_, checkbox) => {
        const checkboxElement = $(checkbox);

        const checked = checkboxElement.attr("checked") !== undefined;

        const id = checkboxElement.attr("id");

        let label = "";

        if (id) {
          label = container
            .find(`label[for="${id}"]`)
            .text()
            .replace(/\s+/g, " ")
            .trim();
        }

        if (label) {
          responseOptions.push(label);
        }

        if (checked && label) {
          selectedCheckboxes.push(label);
        }
      });

      if (!currentResponse && selectedCheckboxes.length > 0) {
        currentResponse = selectedCheckboxes.join(", ");
      }

      //
      // Free Text Questions
      //
      if (!currentResponse) {
        const textValue =
          container.find("textarea").val()?.toString().trim() ?? "";

        if (textValue) {
          currentResponse = textValue;
        }
      }

      const uniqueOptions = [
        ...new Set(responseOptions.filter((option) => option.trim() !== "")),
      ];

      const title = titleGenerator.generate(reference, question);

      const functionalArea = functionalAreaMapper.getFunctionalArea(reference);

      requirements.push({
        reference,
        title,

        derivedType,
        isAnswered,
        isHidden,

        section: "",

        question,
        supportingInformation,

        currentResponse,

        responseOptions: uniqueOptions,

        functionalArea,

        status: "Not Started",
      });
    });

    console.log("");
    console.log(`Total visible requirements: ${requirements.length}`);
    return requirements.sort((a, b) => a.reference.localeCompare(b.reference));
  }
}
