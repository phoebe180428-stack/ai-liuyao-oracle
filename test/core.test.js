import assert from "node:assert/strict";
import { buildNarrativeReading, castByCoins, castByNumbers, castByTime, createLiuyaoSkill } from "../src/index.js";

const numberReading = castByNumbers({
  question: "Should I accept this new job offer?",
  numbers: [12, 25, 8],
  topic: "career",
  locale: "en"
});

assert.equal(numberReading.method, "numbers");
assert.equal(numberReading.primaryHexagram.lines.length, 6);
assert.equal(numberReading.changedHexagram.lines.length, 6);
assert.deepEqual(numberReading.movingLines, [2]);
assert.ok(numberReading.primaryHexagram.nameEn);
assert.ok(numberReading.usefulGod.type);
assert.ok(buildNarrativeReading(numberReading).coreOmen.includes(numberReading.primaryHexagram.nameEn));

const coinReading = castByCoins({
  question: "What is changing?",
  tosses: [1, 2, 3, 0, 2, 1]
});

assert.equal(coinReading.method, "coins");
assert.deepEqual(coinReading.movingLines, [3, 4]);

const timeReading = castByTime({
  question: "What is the timing?",
  date: "2026-05-20T12:00:00+08:00"
});

assert.equal(timeReading.method, "numbers");
assert.ok(timeReading.primaryHexagram.number >= 1);

const skill = createLiuyaoSkill({ locale: "en" });
const result = await skill.run({
  method: "numbers",
  question: "Is this aligned?",
  numbers: [7, 19, 4],
  topic: "relationship"
});

assert.ok(result.prompt.includes("Liuyao"));
assert.ok(result.narrative.guidance);
assert.ok(result.reading.primaryHexagram.nameZh);

console.log("core tests passed");
