import { FUNCTIONAL_AREAS } from "../config/functionalAreas.js";

export class FunctionalAreaMapper {
  getFunctionalArea(reference: string): string {
    for (const [key, value] of Object.entries(FUNCTIONAL_AREAS)) {
      if (reference.includes(key)) {
        return value;
      }
    }

    return "Uncategorised";
  }
}
