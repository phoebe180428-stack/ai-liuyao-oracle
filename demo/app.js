import { buildNarrativeReading, castByCoins, castByNumbers, castByTime } from "../src/index.js";

const state = { method: "time" };
const question = document.querySelector("#question");
const numbers = document.querySelector("#numbers");
const numbersField = document.querySelector(".numbers-field");
const methods = document.querySelectorAll(".method");
const castButton = document.querySelector("#cast");
const immersiveLink = document.querySelector("#immersive-link");
const linesEl = document.querySelector("#lines");

function randomCoinTosses() {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 4));
}

function cast() {
  const castDate = new Date();
  const base = {
    question: question.value,
    topic: "career",
    locale: "en"
  };

  if (state.method === "numbers") {
    const values = numbers.value.split(",").map((value) => Number(value.trim()));
    return {
      method: "numbers",
      payload: { ...base, numbers: values },
      reading: castByNumbers({ ...base, numbers: values })
    };
  }

  if (state.method === "coins") {
    const tosses = randomCoinTosses();
    return {
      method: "coins",
      payload: { ...base, tosses },
      reading: castByCoins({ ...base, tosses })
    };
  }

  return {
    method: "time",
    payload: { ...base, date: castDate.toISOString() },
    reading: castByTime({ ...base, date: castDate })
  };
}

function immersiveUrl(method, payload) {
  const params = new URLSearchParams({
    method,
    question: payload.question,
    topic: payload.topic,
    locale: payload.locale
  });

  if (method === "numbers") params.set("numbers", payload.numbers.join(","));
  if (method === "coins") params.set("tosses", payload.tosses.join(","));
  if (method === "time") params.set("date", payload.date);

  return `./reading.html?${params.toString()}`;
}

function render(result) {
  const { method, payload, reading } = result;
  linesEl.innerHTML = "";
  reading.primaryHexagram.lines.slice().reverse().forEach((line, index) => {
    const el = document.createElement("div");
    el.className = `line ${line.yinYang} ${line.moving ? "moving" : ""}`;
    el.style.animationDelay = `${index * 80}ms`;
    linesEl.appendChild(el);
  });

  document.querySelector("#primary").textContent =
    `${reading.primaryHexagram.nameEn} · ${reading.primaryHexagram.nameZh} ${reading.primaryHexagram.symbol}`;
  document.querySelector("#changed").textContent =
    `${reading.changedHexagram.nameEn} · ${reading.changedHexagram.nameZh}`;
  document.querySelector("#moving").textContent =
    reading.movingLines.length ? reading.movingLines.join(", ") : "Static hexagram";
  document.querySelector("#god").textContent =
    `${reading.usefulGod.type} · ${reading.usefulGod.meaning}`;
  document.querySelector("#trend").textContent =
    `${reading.judgement.trend} (${reading.judgement.confidence})`;
  document.querySelector("#summary").textContent = reading.judgement.summary;

  const narrative = buildNarrativeReading(reading);
  document.querySelector("#reading-title").textContent = narrative.title;
  document.querySelector("#core-omen").textContent = narrative.coreOmen;
  document.querySelector("#changing-energy").textContent = narrative.changingEnergy;
  document.querySelector("#guidance").textContent = narrative.guidance;
  const steps = document.querySelector("#practical-steps");
  steps.innerHTML = "";
  narrative.practicalSteps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    steps.appendChild(item);
  });
  document.querySelector("#avoid").textContent = narrative.avoid;
  document.querySelector("#closing").textContent = narrative.closing;
  immersiveLink.href = immersiveUrl(method, payload);
}

methods.forEach((button) => {
  button.addEventListener("click", () => {
    methods.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.method = button.dataset.method;
    numbersField.classList.toggle("hidden", state.method !== "numbers");
  });
});

castButton.addEventListener("click", () => render(cast()));

render(cast());
