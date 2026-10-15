import { ScalParser } from "./services/scalParser.js";
import { JsonWriter } from "./services/jsonWriter.js";
import { SpreadsheetWriter } from "./services/spreadsheetWriter.js";
import { JiraSubtaskCsvWriter } from "./services/jiraSubtaskCsvWriter.js";
import { JiraSubtaskPreviewWriter } from "./services/jiraSubtaskPreviewWriter.js";

console.log("NHS SCAL Manager");

const parser = new ScalParser();

const requirements = parser.parse();

console.log(`Extracted ${requirements.length} requirements`);

new JsonWriter().write(requirements);

await new SpreadsheetWriter().write(requirements);

new JiraSubtaskCsvWriter().write(requirements);
new JiraSubtaskPreviewWriter().write(requirements);
