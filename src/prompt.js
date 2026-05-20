function compactHexagram(hexagram) {
  return {
    number: hexagram.number,
    nameZh: hexagram.nameZh,
    nameEn: hexagram.nameEn,
    symbol: hexagram.symbol,
    upper: hexagram.upper.nameEn,
    lower: hexagram.lower.nameEn,
    palace: hexagram.palace.nameEn,
    element: hexagram.palace.element,
    shiLine: hexagram.shiLine,
    yingLine: hexagram.yingLine,
    lines: hexagram.lines.map((line) => ({
      position: line.position,
      yinYang: line.yinYang,
      moving: line.moving,
      branch: line.branch,
      element: line.element,
      relative: line.relative,
      beast: line.beast
    }))
  };
}

export function buildOraclePrompt(reading, options = {}) {
  const language = options.language || reading.locale || "en";
  const style = options.style || "mystic-practical";
  const payload = {
    question: reading.question,
    method: reading.method,
    topic: reading.topic,
    primaryHexagram: compactHexagram(reading.primaryHexagram),
    changedHexagram: compactHexagram(reading.changedHexagram),
    mutualHexagram: compactHexagram(reading.mutualHexagram),
    movingLines: reading.movingLines,
    usefulGod: reading.usefulGod,
    judgement: reading.judgement
  };

  if (language.startsWith("zh")) {
    return `你是一位懂六爻的 AI 解读者。请基于结构化排盘结果进行解释，不要重新起卦，不要编造排盘数据。

语气：${style}。既有东方占卜的神秘感，也要给出现实可执行的建议。

排盘 JSON：
${JSON.stringify(payload, null, 2)}

请输出：
1. 卦象总览
2. 本卦代表的当前局势
3. 动爻与变卦代表的变化
4. 用神、世爻、应爻的关键关系
5. 对提问者的行动建议
6. 需要避免的风险
7. 一段有诗意但不绝对化的收束语

限制：不要承诺必然结果；不要替代医疗、法律、金融或紧急建议。`;
  }

  return `You are an interpreter of Liuyao, an ancient Chinese six-line divination system. Explain the oracle from the structured casting data. Do not recast the hexagram. Do not invent missing chart data.

Style: ${style}. Make the reading mysterious enough to feel ancient, but practical enough to help a modern person reflect and act.

Casting JSON:
${JSON.stringify(payload, null, 2)}

Write the reading for an international audience:
1. Core omen
2. The present situation shown by the primary hexagram
3. What is changing through the moving line(s) and changed hexagram
4. Useful god, Shi line, and Ying line interpretation
5. Practical guidance
6. What to avoid
7. A poetic closing sentence

Constraints: Never claim certainty. Do not replace medical, legal, financial, or emergency advice.`;
}
