import { buildNarrativeReading, castByCoins, castByNumbers, castByTime } from "../src/index.js";

const params = new URLSearchParams(window.location.search);

function parseNumbers(value, fallback) {
  if (!value) return fallback;
  const parsed = value.split(",").map((item) => Number(item.trim())).filter((item) => Number.isFinite(item));
  return parsed.length ? parsed : fallback;
}

function getReading() {
  const method = params.get("method") || "time";
  const question = params.get("question") || "What should I understand about this moment?";
  const topic = params.get("topic") || "general";
  const locale = params.get("locale") || "en";
  const base = { question, topic, locale };

  if (method === "numbers") {
    return {
      method,
      reading: castByNumbers({ ...base, numbers: parseNumbers(params.get("numbers"), [12, 25, 8]) })
    };
  }

  if (method === "coins") {
    return {
      method,
      reading: castByCoins({ ...base, tosses: parseNumbers(params.get("tosses"), [1, 2, 3, 0, 2, 1]).slice(0, 6) })
    };
  }

  return {
    method: "time",
    reading: castByTime({ ...base, date: params.get("date") || new Date() })
  };
}

function text(selector, value) {
  document.querySelector(selector).textContent = value;
}

function renderLines(reading) {
  const holder = document.querySelector("#primary-lines");
  holder.innerHTML = "";
  reading.primaryHexagram.lines.slice().reverse().forEach((line, index) => {
    const el = document.createElement("div");
    el.className = `oracle-line ${line.yinYang} ${line.moving ? "moving" : ""}`;
    el.style.animationDelay = `${index * 120}ms`;
    holder.appendChild(el);
  });
}

const { method, reading } = getReading();
const narrative = buildNarrativeReading(reading);

document.title = `${reading.primaryHexagram.nameEn} · AI Liuyao Oracle`;
text("#title", narrative.title);
text("#question", reading.question);
text("#primary-name", `${reading.primaryHexagram.nameEn} / ${reading.primaryHexagram.nameZh} ${reading.primaryHexagram.symbol}`);
text("#changed-name", `${reading.changedHexagram.nameEn} / ${reading.changedHexagram.nameZh} ${reading.changedHexagram.symbol}`);
text("#omen-title", narrative.title);
text("#core-omen", narrative.coreOmen);
text("#changing-energy", narrative.changingEnergy);
text("#useful-god", narrative.usefulGod);
text("#guidance", narrative.guidance);
text("#avoid", narrative.avoid);
text("#closing", narrative.closing);
text("#moving-lines", reading.movingLines.length ? reading.movingLines.join(", ") : "Static");
text("#trend", `${reading.judgement.trend} · ${reading.judgement.confidence}`);
text("#mutual-name", `${reading.mutualHexagram.nameEn} / ${reading.mutualHexagram.nameZh}`);
text("#method", method);
renderLines(reading);
