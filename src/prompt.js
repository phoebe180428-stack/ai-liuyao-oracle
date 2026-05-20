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

export function buildNarrativeReading(reading, options = {}) {
  const language = options.language || reading.locale || "en";
  const primary = reading.primaryHexagram;
  const changed = reading.changedHexagram;
  const useful = reading.usefulGod;
  const moving = reading.movingLines.length
    ? reading.movingLines.map((line) => `Line ${line}`).join(", ")
    : "No moving lines";

  if (language.startsWith("zh")) {
    return {
      title: `${primary.nameZh} 之 ${changed.nameZh}`,
      coreOmen: `${primary.nameZh} 显示当前局势已经形成清晰的结构，但真正的答案藏在变化之中。${reading.judgement.summary}`,
      changingEnergy: `动爻：${moving}。变卦 ${changed.nameZh} 代表事情接下来会转向的新形态，需要观察哪些力量正在从内侧推动局势。`,
      usefulGod: `本次用神为 ${useful.type}，代表 ${useful.meaning}。它是判断这件事时最需要看的象征焦点。`,
      guidance: "接下来先做三件事：第一，把目标拆成一个能在一周内验证的小动作；第二，找到最能证明方向正确的外部反馈；第三，只在反馈变清晰之后再扩大投入。卦象提示你不要靠情绪冲刺，而要靠节奏、证据和边界推进。",
      practicalSteps: [
        "把问题写成一个可验证的假设，而不是一句愿望。",
        "选择一个最小行动，在短周期内获得真实反馈。",
        "记录支持信号和阻力信号，再决定是否加码。",
        "保留退路，不要让单次判断承担全部风险。"
      ],
      avoid: "避免在信息不完整时强行推进，也避免把一次占卜当作替代现实判断的唯一答案。尤其不要因为短期热情而忽视执行成本、外部反馈和长期维护。",
      closing: "卦不是替你选择命运，而是提醒你：变化已经在路上，关键是你如何回应。"
    };
  }

  const primaryImage = `${primary.upper.nature} above ${primary.lower.nature}`;
  const changedImage = `${changed.upper.nature} above ${changed.lower.nature}`;
  const trendCopy = {
    favorable: "The omen is broadly supportive, but it still asks for timing rather than force.",
    mixed_with_conditions: "The omen is conditional: the path can open, but only if the pressure is handled with care.",
    challenging: "The omen is cautious. It asks for protection, patience, and clearer ground before decisive action."
  }[reading.judgement.trend] || reading.judgement.summary;

  return {
    title: `${primary.nameEn} changing to ${changed.nameEn}`,
    coreOmen: `${primary.nameEn}, ${primaryImage}, describes the present pattern around your question. ${trendCopy}`,
    changingEnergy: `${moving} leads toward ${changed.nameEn}, ${changedImage}. This shows where the situation is no longer still and where your attention should go first.`,
    usefulGod: `The useful god is ${useful.type}: ${useful.meaning}. In Liuyao, this is the symbolic focus selected by the nature of the question.`,
    guidance: "Move as if you are listening for timing. First, define the smallest real-world test that would prove this direction has life. Second, seek a signal from people outside your own enthusiasm: users, developers, partners, or the market. Third, increase commitment only after the signal repeats. The oracle favors disciplined momentum over dramatic leaps.",
    practicalSteps: [
      "Write the question as a testable hypothesis, not as a wish.",
      "Choose one small action that can create evidence within a short cycle.",
      "Separate encouraging signals from vanity signals.",
      "Keep the next step reversible until the pattern becomes clearer."
    ],
    avoid: "Avoid forcing certainty out of an uncertain moment. Do not confuse emotional intensity with evidence, and do not treat the oracle as medical, legal, financial, or emergency advice.",
    closing: "The six lines do not close the future; they show where the future is beginning to bend."
  };
}
