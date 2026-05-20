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
7. Always attach an immersive HTML result appendix. If the host product supports local files or static routes, provide a `demo/reading.html?...` link. If it does not, provide a complete standalone HTML snippet or clearly state that the user can open the generated URL in this repository's `demo/reading.html`.
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
9. Immersive HTML Result Page

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

## Immersive HTML Result Page

This section is mandatory. Never omit it from the final answer.

When returning the final reading, always include an appendix named:

```txt
Immersive HTML Result Page
```

If this repository's demo files are available, include a link in this exact format:

```txt
View Immersive Liuyao Reading: ./demo/reading.html?method=...&question=...
```

The URL must contain enough casting parameters to recreate the same result:

- `method=numbers&numbers=34,78,9`
- `method=coins&tosses=1,2,3,0,2,1`
- `method=time&date=2026-05-20T12:00:00.000Z`
- `question=...`
- `topic=...`
- `locale=...`

If the host product cannot link to local files, still output the URL and add:

```txt
Open this repository locally and paste the path after demo/reading.html.
```

If the user explicitly asks for a file attachment and the host product can create files, create `liuyao-reading.html` containing the same result in a mystical visual layout.

## Safety

Never claim certainty. Never present the reading as medical, legal, financial, or emergency advice.
