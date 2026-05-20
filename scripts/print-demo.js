import { castByNumbers, buildOraclePrompt } from "../src/index.js";

const reading = castByNumbers({
  question: "Should I accept this new job offer?",
  numbers: [12, 25, 8],
  topic: "career",
  locale: "en"
});

console.log(JSON.stringify({
  primary: reading.primaryHexagram.nameEn,
  changed: reading.changedHexagram.nameEn,
  movingLines: reading.movingLines,
  trend: reading.judgement.trend
}, null, 2));

console.log("\n--- Prompt Preview ---\n");
console.log(buildOraclePrompt(reading).slice(0, 900));
