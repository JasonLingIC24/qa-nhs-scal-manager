import * as fs from "fs";
export class ScalParser {
    parse() {
        const html = fs.readFileSync("data/input/html-scal.html", "utf8");
        const regex = /PDS-FHIR-[A-Z0-9-]+/g;
        const matches = html.match(regex) ?? [];
        const uniqueMatches = [...new Set(matches)].sort();
        console.log(`Found ${uniqueMatches.length} references\n`);
        uniqueMatches.slice(0, 50).forEach((reference) => {
            console.log(reference);
        });
    }
}
