import { FUNCTIONAL_AREAS } from "../config/functionalAreas.js";

export class FunctionalAreaMapper {
  getFunctionalArea(reference: string): string {
    for (const key of Object.keys(FUNCTIONAL_AREAS)) {
      if (reference.includes(key)) {
        return FUNCTIONAL_AREAS[key];
      }
    }

    return "Uncategorised";
  }
}
