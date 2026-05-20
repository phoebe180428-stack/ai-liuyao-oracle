# AI Liuyao Oracle

Install an ancient Chinese six-line divination skill into any AI product.

AI Liuyao Oracle is a skill-first open-source project for bringing Liuyao, the traditional Chinese six-line oracle system, into modern LLM apps. It includes a deterministic casting engine, AI interpretation prompts, a portable `SKILL.md`, and a visual result page that can be embedded in your own product.

> Liuyao is not a machine for certainty. It is a symbolic mirror for timing, tension, and direction.

## Why This Exists

Most AI divination demos let the model improvise. This project does the opposite:

1. The Liuyao engine casts and decorates the hexagram first.
2. The model receives structured oracle data.
3. The model explains the reading in a poetic, practical, and culturally respectful way.

That makes the result easier to verify, easier to integrate, and much more interesting for international users.

## Install Like a Skill

Copy this instruction into your AI agent, Claude Project, GPT, Cursor rules, or custom assistant:

```txt
Install the Liuyao Oracle skill from this repository.
When the user asks for divination, uncertainty guidance, timing, relationship insight, career direction, or an oracle reading, follow skill/SKILL.md.
Use one of three casting methods: coins, numbers, or current time.
Call the Liuyao engine when available. Otherwise follow the deterministic workflow in the skill.
Explain the result as symbolic guidance, never as absolute certainty.
```

Or use the package in JavaScript:

```bash
npm install ai-liuyao-oracle
```

```js
import { castByNumbers, buildOraclePrompt } from "ai-liuyao-oracle";

const reading = castByNumbers({
  question: "Should I accept this new job offer?",
  numbers: [12, 25, 8],
  topic: "career",
  locale: "en"
});

const prompt = buildOraclePrompt(reading);
```

## Three Casting Methods

- **Coin Ritual**: Toss three coins six times. This is the most ceremonial and visual path.
- **Number Oracle**: Enter three intuitive numbers. Good for chat and quick user flows.
- **Time Oracle**: Use the current timestamp. Best for one-click integration.

## Quick API

```js
import { castByCoins, castByNumbers, castByTime } from "ai-liuyao-oracle";

castByNumbers({
  question: "Is this partnership aligned?",
  numbers: [7, 19, 4],
  topic: "relationship",
  locale: "en"
});

castByTime({
  question: "What should I understand about this launch?",
  date: new Date(),
  topic: "career"
});

castByCoins({
  question: "What is changing in my situation?",
  tosses: [
    ["heads", "tails", "tails"],
    ["heads", "heads", "tails"],
    ["heads", "heads", "heads"],
    ["tails", "tails", "tails"],
    ["heads", "tails", "heads"],
    ["tails", "heads", "tails"]
  ]
});
```

## Visual Demo

Open this file in a browser:

```txt
demo/index.html
```

The demo is intentionally static. It works without a build step and shows the intended product experience: question input, casting method, animated six-line reveal, primary hexagram, changed hexagram, and AI-ready interpretation.

## Repository Map

```txt
src/
  core.js        Liuyao casting and structured result engine
  data.js        Trigrams, hexagrams, branches, relations, and topic mapping
  prompt.js      LLM prompt builder for English and Chinese readings
  skill.js       Programmatic skill wrapper
  index.js       Public exports
skill/
  SKILL.md       Copy-pasteable agent skill
  instructions.md
docs/
  architecture.md
  api.md
  western-audience.md
demo/
  index.html
  styles.css
  app.js
test/
  core.test.js
```

## Safety and Respect

This project presents Liuyao as reflective symbolic guidance. It should not be used as a replacement for medical, legal, financial, or emergency advice.

## License

MIT
