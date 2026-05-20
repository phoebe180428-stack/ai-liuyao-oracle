# API

## `castByNumbers`

```js
castByNumbers({
  question: "Should I accept this offer?",
  numbers: [12, 25, 8],
  topic: "career",
  locale: "en"
})
```

## `castByTime`

```js
castByTime({
  question: "What should I understand about this launch?",
  date: new Date(),
  topic: "career"
})
```

## `castByCoins`

```js
castByCoins({
  question: "What is changing?",
  tosses: [
    ["heads", "tails", "tails"],
    ["heads", "heads", "tails"],
    ["heads", "heads", "heads"],
    ["tails", "tails", "tails"],
    ["heads", "tails", "heads"],
    ["tails", "heads", "tails"]
  ]
})
```

## Result

Every cast returns:

- `primaryHexagram`
- `changedHexagram`
- `mutualHexagram`
- `movingLines`
- `usefulGod`
- `judgement`
- `safety`

This JSON is designed to be passed into any LLM.
