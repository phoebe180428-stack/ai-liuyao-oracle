import {
  BRANCH_ELEMENTS,
  CONTROLS,
  GENERATES,
  HEXAGRAMS,
  PALACE_BRANCHES,
  SIX_BEASTS,
  TOPIC_USEFUL_GOD,
  TRIGRAMS
} from "./data.js";

const trigramByKey = Object.fromEntries(TRIGRAMS.map((trigram) => [trigram.key, trigram]));
const trigramByRemainder = Object.fromEntries(TRIGRAMS.map((trigram) => [trigram.remainder, trigram]));
const hexagramByPair = Object.fromEntries(HEXAGRAMS.map((hexagram) => [`${hexagram.upper}:${hexagram.lower}`, hexagram]));

function oneBasedMod(value, divisor) {
  const remainder = Number(value) % divisor;
  return remainder === 0 ? divisor : remainder;
}

function lineSymbol(line, moving = false) {
  if (line === 1) return moving ? "老阳" : "少阳";
  return moving ? "老阴" : "少阴";
}

function getTrigramFromLines(lines) {
  const match = TRIGRAMS.find((trigram) => trigram.lines.join("") === lines.join(""));
  if (!match) throw new Error(`No trigram for lines ${lines.join(",")}`);
  return match;
}

function getHexagram(upperKey, lowerKey) {
  const hexagram = hexagramByPair[`${upperKey}:${lowerKey}`];
  if (!hexagram) throw new Error(`No hexagram for ${upperKey}/${lowerKey}`);
  return hexagram;
}

function relationFromElements(palaceElement, lineElement) {
  if (lineElement === palaceElement) return "兄弟";
  if (GENERATES[palaceElement] === lineElement) return "子孙";
  if (CONTROLS[palaceElement] === lineElement) return "妻财";
  if (CONTROLS[lineElement] === palaceElement) return "官鬼";
  if (GENERATES[lineElement] === palaceElement) return "父母";
  return "未知";
}

function buildHexagramFromLines(lines, movingLines = []) {
  if (!Array.isArray(lines) || lines.length !== 6) {
    throw new Error("A Liuyao hexagram requires exactly six lines from bottom to top.");
  }

  const lower = getTrigramFromLines(lines.slice(0, 3));
  const upper = getTrigramFromLines(lines.slice(3, 6));
  const base = getHexagram(upper.key, lower.key);
  const palace = trigramByKey[base.palace];
  const branches = PALACE_BRANCHES[base.palace];

  return {
    ...base,
    symbol: `${trigramByKey[base.upper].symbol}${trigramByKey[base.lower].symbol}`,
    upper: trigramByKey[base.upper],
    lower: trigramByKey[base.lower],
    palace: {
      key: base.palace,
      nameZh: palace.nameZh,
      nameEn: palace.nameEn,
      element: palace.element
    },
    lines: lines.map((value, index) => {
      const branch = branches[index];
      const element = BRANCH_ELEMENTS[branch];
      const position = index + 1;
      const moving = movingLines.includes(position);
      return {
        position,
        value,
        yinYang: value === 1 ? "yang" : "yin",
        label: lineSymbol(value, moving),
        moving,
        branch,
        element,
        relative: relationFromElements(palace.element, element),
        beast: SIX_BEASTS[index]
      };
    })
  };
}

function changedLines(lines, movingLines) {
  return lines.map((line, index) => movingLines.includes(index + 1) ? (line === 1 ? 0 : 1) : line);
}

function mutualHexagram(lines) {
  return buildHexagramFromLines([
    lines[1], lines[2], lines[3],
    lines[2], lines[3], lines[4]
  ]);
}

function findUsefulGod(primaryHexagram, topic = "general") {
  const target = TOPIC_USEFUL_GOD[topic] || TOPIC_USEFUL_GOD.general;
  if (target === "世爻") {
    return { type: target, meaning: "the querent, inner stance, agency", lines: [primaryHexagram.shiLine] };
  }
  if (target === "应爻") {
    return { type: target, meaning: "the other side, counterpart, external condition", lines: [primaryHexagram.yingLine] };
  }
  const lines = primaryHexagram.lines.filter((line) => line.relative === target).map((line) => line.position);
  return {
    type: target,
    meaning: usefulGodMeaning(target),
    lines
  };
}

function usefulGodMeaning(type) {
  return {
    官鬼: "career, authority, pressure, illness, hidden risk, obligation",
    妻财: "money, assets, resources, partner in some traditional contexts",
    父母: "documents, protection, elders, contracts, housing, study",
    兄弟: "peers, friends, competitors, shared pressure",
    子孙: "relief, children, pleasure, healing, freedom",
    世爻: "the querent, self-position, inner agency",
    应爻: "the other side, counterpart, environment"
  }[type] || "symbolic focus of the reading";
}

function judgeTrend(primaryHexagram, movingLines, usefulGod) {
  let score = 0.5;
  const usefulSet = new Set(usefulGod.lines);
  const movingSet = new Set(movingLines);

  if (usefulGod.lines.length > 0) score += 0.12;
  if (movingLines.length === 0) score -= 0.03;
  if (movingLines.some((line) => usefulSet.has(line))) score += 0.12;
  if (movingSet.has(primaryHexagram.shiLine)) score += 0.06;
  if (movingSet.has(primaryHexagram.yingLine)) score += 0.04;
  if (primaryHexagram.upper.key === primaryHexagram.lower.key) score -= 0.04;

  score = Math.max(0.05, Math.min(0.95, score));
  const trend = score >= 0.68 ? "favorable" : score >= 0.46 ? "mixed_with_conditions" : "challenging";
  return {
    trend,
    confidence: Number(score.toFixed(2)),
    summary: trend === "favorable"
      ? "The pattern shows usable momentum, especially if the querent acts with timing and restraint."
      : trend === "mixed_with_conditions"
        ? "The oracle shows potential, but the outcome depends on how the changing pressure is handled."
        : "The pattern asks for patience, protection, and clearer conditions before forcing a result."
  };
}

function normalizeReading({ question = "", method, lines, movingLines, input = {}, topic = "general", locale = "en" }) {
  const primaryHexagram = buildHexagramFromLines(lines, movingLines);
  const changedHexagram = buildHexagramFromLines(changedLines(lines, movingLines));
  const mutual = mutualHexagram(lines);
  const usefulGod = findUsefulGod(primaryHexagram, topic);
  const judgement = judgeTrend(primaryHexagram, movingLines, usefulGod);

  return {
    version: "0.1.0",
    question,
    method,
    input,
    topic,
    locale,
    primaryHexagram,
    changedHexagram,
    mutualHexagram: mutual,
    movingLines,
    usefulGod,
    judgement,
    safety: {
      note: "This reading is symbolic guidance and should not replace medical, legal, financial, or emergency advice."
    }
  };
}

export function castByNumbers({ question = "", numbers, topic = "general", locale = "en" }) {
  if (!Array.isArray(numbers) || numbers.length !== 3) {
    throw new Error("Number casting requires exactly three integers.");
  }
  const upper = trigramByRemainder[oneBasedMod(numbers[0], 8)];
  const lower = trigramByRemainder[oneBasedMod(numbers[1], 8)];
  const movingLine = oneBasedMod(numbers[2], 6);
  return normalizeReading({
    question,
    method: "numbers",
    input: { numbers },
    lines: [...lower.lines, ...upper.lines],
    movingLines: [movingLine],
    topic,
    locale
  });
}

export function castByTime({ question = "", date = new Date(), topic = "general", locale = "en" }) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date for time casting.");
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const upper = trigramByRemainder[oneBasedMod(year, 8)];
  const lower = trigramByRemainder[oneBasedMod(month, 8)];
  const movingLine = oneBasedMod(day, 6);
  return normalizeReading({
    question,
    method: "time",
    input: { date: d.toISOString(), numbers: [year, month, day] },
    lines: [...lower.lines, ...upper.lines],
    movingLines: [movingLine],
    topic,
    locale
  });
}

export function castByCoins({ question = "", tosses, topic = "general", locale = "en" }) {
  if (!Array.isArray(tosses) || tosses.length !== 6) {
    throw new Error("Coin casting requires six tosses, each containing three coins.");
  }

  const lines = [];
  const movingLines = [];
  tosses.forEach((toss, index) => {
    const heads = Array.isArray(toss)
      ? toss.filter((coin) => coin === "heads" || coin === "flower" || coin === true || coin === 1).length
      : Number(toss);

    if (heads < 0 || heads > 3) throw new Error("Each coin toss must contain 0 to 3 heads.");
    if (heads === 3) {
      lines.push(1);
      movingLines.push(index + 1);
    } else if (heads === 2) {
      lines.push(0);
    } else if (heads === 1) {
      lines.push(1);
    } else {
      lines.push(0);
      movingLines.push(index + 1);
    }
  });

  return normalizeReading({
    question,
    method: "coins",
    input: { tosses },
    lines,
    movingLines,
    topic,
    locale
  });
}

export function castLiuyao(options) {
  if (options.method === "numbers") return castByNumbers(options);
  if (options.method === "time") return castByTime(options);
  if (options.method === "coins") return castByCoins(options);
  throw new Error("Unknown casting method. Use coins, numbers, or time.");
}
