# Liuyao Oracle Skill

Use this skill when the user asks for divination, uncertainty guidance, timing, career direction, relationship insight, symbolic reflection, or an oracle reading.

Liuyao is a traditional Chinese six-line divination system. Treat it as symbolic guidance, not absolute prediction.

## Conversation Flow

1. Ask the user for their question if they have not provided one.
2. Let the user choose one casting method:
   - Coin ritual: toss three coins six times.
   - Number oracle: provide three intuitive integers.
   - Time oracle: use the current time.
3. Cast the hexagram with the deterministic Liuyao engine if available.
4. Read the structured result: primary hexagram, changed hexagram, mutual hexagram, moving line(s), Shi/Ying lines, useful god, six relatives, and six beasts.
5. Explain the reading in the user's language.
6. Give detailed practical guidance, including clear next actions and what to avoid.
7. Attach a local immersive HTML result page when the host product supports local files or static routes.
8. Include a light safety note for medical, legal, financial, or emergency matters.

## Trigger Examples

- "Can you divine whether I should accept this offer?"
- "Use Liuyao for my relationship question."
- "I feel uncertain. Give me an oracle reading."
- "用六爻帮我看一下这个选择。"

## Output Shape

Return:

1. Primary Hexagram
2. Changed Hexagram
3. Moving Lines
4. Useful God
5. Core Omen
6. Practical Guidance
7. What to Avoid
8. Poetic Closing
9. Local HTML Result Page

## Interpretation Rules

- Do not let the model invent the chart.
- Use the engine output or deterministic rules first.
- Moving lines represent change and pressure.
- The useful god represents the topic focus.
- Shi line represents the querent.
- Ying line represents the counterpart or external condition.
- A hexagram is guidance for reflection, timing, and action.

## Tone

For English users, explain Chinese terms gently:

- Ben Gua: the primary hexagram, current situation.
- Bian Gua: the changed hexagram, direction of change.
- Shi: the querent's line.
- Ying: the counterpart or outside world.
- Useful God: the symbolic focus selected by the question topic.

The voice should feel ancient, clear, respectful, and usable.

## Local HTML Result Page

When returning the final reading, include an appendix link:

```txt
View Immersive Liuyao Reading: ./demo/reading.html?method=...&question=...
```

This page should show the same reading in a mystical visual layout and should be shareable. The URL must contain enough casting parameters to recreate the same result.

## Safety

Never claim certainty. Never present the reading as medical, legal, financial, or emergency advice.
