import { castLiuyao } from "./core.js";
import { buildNarrativeReading, buildOraclePrompt } from "./prompt.js";

export function createLiuyaoSkill(defaults = {}) {
  return {
    name: "liuyao-oracle",
    description: "Cast and interpret a Liuyao six-line oracle reading.",
    triggers: [
      "liuyao",
      "six-line oracle",
      "i ching divination",
      "uncertainty guidance",
      "career oracle",
      "love oracle",
      "timing oracle"
    ],
    async run(input) {
      const reading = castLiuyao({ ...defaults, ...input });
      return {
        reading,
        narrative: buildNarrativeReading(reading, {
          language: input.locale || defaults.locale
        }),
        prompt: buildOraclePrompt(reading, {
          language: input.locale || defaults.locale,
          style: input.style || defaults.style
        })
      };
    }
  };
}
