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

    $(".radio-button-question").each((_, element) => {
      const container = $(element);

      const reference = container.find("strong").first().text().trim();

      if (!reference.startsWith("PDS-FHIR")) {
        return;
      }

      const functionalArea = functionalAreaMapper.getFunctionalArea(reference);

      const question = container
        .find("h4")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim();

      const supportingInformation = container
        .find("legend p")
        .first()
        .text()
        .replace(/\s+/g, " ")
        .trim();

      const responseOptions: string[] = [];

      container.find(".nhsuk-radios__label").each((_, label) => {
        const option = $(label).text().trim();

        if (option) {
          responseOptions.push(option);
        }
      });

      const uniqueOptions = [...new Set(responseOptions)];

      let currentResponse = "";

      container.find('input[type="radio"]').each((_, radio) => {
        const checked = $(radio).attr("checked") !== undefined;

        if (checked) {
          currentResponse = $(radio).attr("value") ?? "";
        }
      });

      const title = titleGenerator.generate(reference, question);

      requirements.push({
        title,
        section: "",
        reference,
        question,
        supportingInformation,
        currentResponse,
        responseOptions: uniqueOptions,
        functionalArea,
        status: "Not Started",
      });
    });

    return requirements;
  }
}
