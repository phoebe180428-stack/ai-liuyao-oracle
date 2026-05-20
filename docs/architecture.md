# Architecture

AI Liuyao Oracle is organized around a simple principle: deterministic oracle data first, AI interpretation second.

## Layers

1. **Core Engine**
   - Casts by coins, numbers, or time.
   - Builds primary, changed, and mutual hexagrams.
   - Decorates lines with branches, elements, six relatives, six beasts, Shi/Ying, and useful god.

2. **Prompt Pack**
   - Converts structured readings into model-ready prompts.
   - Supports English and Chinese output.
   - Keeps cultural context while avoiding absolute claims.

3. **Skill Pack**
   - `skill/SKILL.md` gives AI agents a portable behavior contract.
   - Agents can install the repository as a project skill without learning the codebase.

4. **Visual Demo**
   - Static browser demo.
   - No framework or build step required.
   - Shows the intended user experience for embeddable oracle pages.

## Data Flow

```txt
question + casting input
  -> Liuyao core engine
  -> structured reading JSON
  -> prompt builder
  -> LLM interpretation
  -> visual result page
```

## Design Decision

The LLM never decides the hexagram. It only interprets deterministic structured data.
