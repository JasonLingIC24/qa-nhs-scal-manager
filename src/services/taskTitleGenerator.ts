export class TaskTitleGenerator {
  generate(reference: string, question: string): string {
    const manualTitles: Record<string, string> = {
      "PDS-FHIR-FLGSEN-3": "Sensitive Patient Warning",

      "PDS-FHIR-FLGSEN-4": "Sensitive Patient Access Control",

      "PDS-FHIR-FLGINV-1": "Invalidated Record Warning",

      "PDS-FHIR-FLGINV-2": "Invalidated Record Decoupling",

      "PDS-FHIR-SNCNAM-1": "Display Name Prefixes",

      "PDS-FHIR-SNCCMP-5": "Update Matched Local Record",

      "PDS-FHIR-UPDVLD-1": "Validate Data Before Update",

      "PDS-FHIR-UPDVLD-1.1": "Validate Date Format Before Update",

      "PDS-FHIR-UPDVLD-1.3": "Validate Vocabulary Data",

      "PDS-FHIR-PDS-PCP-8": "Pass Correct User Profile ID",
    };

    if (manualTitles[reference]) {
      return manualTitles[reference];
    }

    let title = question
      .replace(/^Does your product\s+/i, "")
      .replace(/^Do you\s+/i, "")
      .replace(/^When\s+/i, "")
      .replace(/^Have you\s+/i, "")
      .replace(/\?$/, "")
      .trim();

    if (title.length > 80) {
      title = `${title.substring(0, 77)}...`;
    }

    return title;
  }
}
