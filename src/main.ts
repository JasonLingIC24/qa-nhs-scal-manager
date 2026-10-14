import { ScalParser } from "./services/scalParser.js";
import { JsonWriter } from "./services/jsonWriter.js";

console.log("NHS SCAL Manager");

const parser = new ScalParser();

const requirements = parser.parse();

console.log(`Extracted ${requirements.length} requirements`);

const writer = new JsonWriter();

writer.write(requirements);
