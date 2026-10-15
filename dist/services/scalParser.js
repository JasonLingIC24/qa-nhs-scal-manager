import * as fs from "fs";
import * as cheerio from "cheerio";
import { FunctionalAreaMapper } from "./functionalAreaMapper.js";
import { TaskTitleGenerator } from "./taskTitleGenerator.js";
export class ScalParser {
    parse() {
        const html = fs.readFileSync("data/input/html-scal.html", "utf8");
        const $ = cheerio.load(html);
        const requirements = [];
        const functionalAreaMapper = new FunctionalAreaMapper();
        const titleGenerator = new TaskTitleGenerator();
        $(".radio-button-question, .free-text-question").each((_, element) => {
            const container = $(element);
            const isAnswered = container.attr("data-is-answered") === "true";
            const derivedType = container.find('input[id$="__DerivedType"]').val()?.toString() ?? "";
            //
            // Ignore informational messages
            //
            if (derivedType === "MessageSectionQuestionView") {
                return;
            }
            const reference = container.find("strong").first().text().trim();
            if (!reference.startsWith("PDS-FHIR")) {
                return;
            }
            const question = container
                .find("h3, h4")
                .first()
                .text()
                .replace(/\s+/g, " ")
                .trim();
            const supportingInformation = container
                .find("legend p")
                .map((_, p) => $(p).text().trim())
                .get()
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();
            const responseOptions = [];
            //
            // Radio button responses
            //
            container.find(".nhsuk-radios__label").each((_, label) => {
                const option = $(label).text().trim();
                if (option) {
                    responseOptions.push(option);
                }
            });
            const uniqueOptions = [...new Set(responseOptions)];
            let currentResponse = "";
            //
            // Radio buttons
            //
            container.find('input[type="radio"]').each((_, radio) => {
                if ($(radio).attr("checked") !== undefined) {
                    currentResponse = $(radio).attr("value") ?? "";
                }
            });
            //
            // Textarea answers
            //
            if (!currentResponse) {
                const textValue = container.find("textarea").val()?.toString().trim() ?? "";
                if (textValue) {
                    currentResponse = textValue;
                }
            }
            const title = titleGenerator.generate(reference, question);
            const functionalArea = functionalAreaMapper.getFunctionalArea(reference);
            requirements.push({
                reference,
                title,
                derivedType,
                isAnswered,
                section: "",
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
