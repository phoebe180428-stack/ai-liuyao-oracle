import { readFile } from "node:fs/promises";
import { createLiuyaoSkill } from "../src/index.js";

const skillText = await readFile(new URL("../skill/SKILL.md", import.meta.url), "utf8");
const installPrompt = await readFile(new URL("../skill/INSTALL_PROMPT.md", import.meta.url), "utf8");
const liuyao = createLiuyaoSkill({
  locale: "en",
  style: "mystic-practical"
});

const userQuestion = "I am unsure whether I should leave my current job and join a new company. Can you divine it?";
const selectedMethod = "numbers";
const selectedNumbers = [12, 25, 8];

const result = await liuyao.run({
  method: selectedMethod,
  question: userQuestion,
  numbers: selectedNumbers,
  topic: "career",
  locale: "en"
});

const { reading, narrative, localHtml, prompt } = result;

console.log("=== GitHub Visitor Simulation ===\n");
console.log("1. Developer finds this repository on GitHub.");
console.log("2. Developer copies skill/INSTALL_PROMPT.md into their own AI agent instructions.");
console.log(`3. Skill loaded: ${skillText.includes("Liuyao Oracle Skill") ? "yes" : "no"}\n`);
console.log(`4. HTML appendix required: ${installPrompt.includes("Every final reading MUST include") ? "yes" : "no"}\n`);

console.log("=== Simulated User Conversation ===\n");
console.log(`User: ${userQuestion}`);
console.log("Agent: I can do a Liuyao oracle reading. Choose one casting method:");
console.log("       1. Coin ritual");
console.log("       2. Three intuitive numbers");
console.log("       3. Current time");
console.log(`User: Use ${selectedMethod}. My numbers are ${selectedNumbers.join(", ")}.`);
console.log("Agent: Casting the six-line oracle...\n");

console.log("=== Structured Oracle Result ===\n");
console.log(`Primary Hexagram: ${reading.primaryHexagram.nameEn} / ${reading.primaryHexagram.nameZh} ${reading.primaryHexagram.symbol}`);
console.log(`Changed Hexagram: ${reading.changedHexagram.nameEn} / ${reading.changedHexagram.nameZh} ${reading.changedHexagram.symbol}`);
console.log(`Moving Lines: ${reading.movingLines.join(", ") || "none"}`);
console.log(`Useful God: ${reading.usefulGod.type} (${reading.usefulGod.meaning})`);
console.log(`Trend: ${reading.judgement.trend} (${reading.judgement.confidence})\n`);

console.log("=== User-Facing Reading ===\n");
console.log(`${narrative.title}\n`);
console.log(`Core Omen: ${narrative.coreOmen}\n`);
console.log(`Changing Energy: ${narrative.changingEnergy}\n`);
console.log(`Guidance: ${narrative.guidance}\n`);
console.log("Practical Steps:");
narrative.practicalSteps.forEach((step, index) => {
  console.log(`  ${index + 1}. ${step}`);
});
console.log("");
console.log(`What to Avoid: ${narrative.avoid}\n`);
console.log(`Closing: ${narrative.closing}\n`);

console.log("=== Attached Local HTML Result Page ===\n");
console.log(`${localHtml.label}: ${localHtml.url}`);
console.log(`${localHtml.note}\n`);

console.log("=== Prompt Sent To The Developer's Model ===\n");
console.log(prompt.slice(0, 1400));
console.log("\n...[truncated]");
