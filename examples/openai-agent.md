# OpenAI-Compatible Agent Example

Use the core engine to create deterministic oracle data, then pass the prompt into your model.

```js
import OpenAI from "openai";
import { castByTime, buildOraclePrompt } from "ai-liuyao-oracle";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const reading = castByTime({
  question: "Should I move to another city?",
  topic: "decision",
  locale: "en"
});

const completion = await client.chat.completions.create({
  model: "gpt-4.1-mini",
  messages: [
    { role: "system", content: "You explain Liuyao as symbolic guidance, never certainty." },
    { role: "user", content: buildOraclePrompt(reading) }
  ]
});

console.log(completion.choices[0].message.content);
```
