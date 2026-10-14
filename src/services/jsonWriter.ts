import * as fs from "fs";

export class JsonWriter {
  write(data: unknown): void {
    fs.mkdirSync("data/output", {
      recursive: true,
    });

    fs.writeFileSync(
      "data/output/requirements.json",
      JSON.stringify(data, null, 2),
    );

    console.log("Wrote: data/output/requirements.json");
  }
}
