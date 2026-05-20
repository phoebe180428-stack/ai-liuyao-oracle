import { castLiuyao } from "./core.js";
import { buildNarrativeReading, buildOraclePrompt } from "./prompt.js";

export function buildLocalReadingUrl(input, options = {}) {
  const basePath = options.basePath || "./demo/reading.html";
  const params = new URLSearchParams({
    method: input.method,
    question: input.question || "",
    topic: input.topic || "general",
    locale: input.locale || "en"
  });

  if (input.method === "numbers" && input.numbers) params.set("numbers", input.numbers.join(","));
  if (input.method === "coins" && input.tosses) params.set("tosses", input.tosses.join(","));
  if (input.method === "time") params.set("date", input.date || new Date().toISOString());

  return `${basePath}?${params.toString()}`;
}

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
      const merged = { ...defaults, ...input };
      const reading = castLiuyao(merged);
      return {
        reading,
        narrative: buildNarrativeReading(reading, {
          language: input.locale || defaults.locale
        }),
        localHtml: {
          label: "View Immersive Liuyao Reading",
          url: buildLocalReadingUrl(merged, {
            basePath: input.readingPageBasePath || defaults.readingPageBasePath
          }),
          shareable: true,
          note: "This static HTML page recreates the same reading from URL parameters and can be shared or embedded."
        },
        prompt: buildOraclePrompt(reading, {
          language: input.locale || defaults.locale,
          style: input.style || defaults.style
        })
      };
    }
  };
}
