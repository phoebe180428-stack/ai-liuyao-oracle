# Simulate Installing the Skill

Use this before publishing the repository to GitHub. It simulates what a stranger would experience:

1. They discover the repository.
2. They copy `skill/SKILL.md` into their own AI agent.
3. Their user asks for a Liuyao reading.
4. The agent casts the hexagram, produces structured data, and creates a user-facing interpretation.

Run:

```bash
npm run simulate
```

Expected output:

- The simulated GitHub installation step
- A user and agent conversation
- Primary hexagram and changed hexagram
- Moving lines
- Useful god
- User-facing oracle interpretation
- The prompt that would be sent to a real LLM

This test does not require an API key. It verifies the local skill experience before you connect OpenAI, Claude, Gemini, or a custom model.
