import { JsonWriter } from "./services/jsonWriter.js";
const requirements = [
    {
        section: "Sensitive Patients",
        reference: "PDS-FHIR-FLGSEN-3",
        question: "On selection, does your product warn the end user that a patient is sensitive?",
        currentResponse: "No",
        responseOptions: ["Yes", "No", "Partially", "Not Applicable"],
    },
];
const writer = new JsonWriter();
writer.write(requirements);
