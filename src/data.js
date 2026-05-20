export const TRIGRAMS = [
  { key: "qian", remainder: 1, nameZh: "乾", symbol: "☰", nameEn: "Qian / Heaven", element: "metal", nature: "heaven", lines: [1, 1, 1] },
  { key: "dui", remainder: 2, nameZh: "兑", symbol: "☱", nameEn: "Dui / Lake", element: "metal", nature: "lake", lines: [1, 1, 0] },
  { key: "li", remainder: 3, nameZh: "离", symbol: "☲", nameEn: "Li / Fire", element: "fire", nature: "fire", lines: [1, 0, 1] },
  { key: "zhen", remainder: 4, nameZh: "震", symbol: "☳", nameEn: "Zhen / Thunder", element: "wood", nature: "thunder", lines: [1, 0, 0] },
  { key: "xun", remainder: 5, nameZh: "巽", symbol: "☴", nameEn: "Xun / Wind", element: "wood", nature: "wind", lines: [0, 1, 1] },
  { key: "kan", remainder: 6, nameZh: "坎", symbol: "☵", nameEn: "Kan / Water", element: "water", nature: "water", lines: [0, 1, 0] },
  { key: "gen", remainder: 7, nameZh: "艮", symbol: "☶", nameEn: "Gen / Mountain", element: "earth", nature: "mountain", lines: [0, 0, 1] },
  { key: "kun", remainder: 8, nameZh: "坤", symbol: "☷", nameEn: "Kun / Earth", element: "earth", nature: "earth", lines: [0, 0, 0] }
];

const rows = [
  [1, "乾为天", "The Creative", "qian", "qian", 6, 3, "qian"],
  [2, "天风姤", "Coming to Meet", "qian", "xun", 1, 4, "qian"],
  [3, "天山遁", "Retreat", "qian", "gen", 2, 5, "qian"],
  [4, "天地否", "Standstill", "qian", "kun", 3, 6, "qian"],
  [5, "风地观", "Contemplation", "xun", "kun", 4, 1, "qian"],
  [6, "山地剥", "Splitting Apart", "gen", "kun", 5, 2, "qian"],
  [7, "火地晋", "Progress", "li", "kun", 4, 1, "qian"],
  [8, "火天大有", "Great Possession", "li", "qian", 3, 6, "qian"],
  [9, "坎为水", "The Abysmal Water", "kan", "kan", 6, 3, "kan"],
  [10, "水泽节", "Limitation", "kan", "dui", 1, 4, "kan"],
  [11, "水雷屯", "Difficulty at the Beginning", "kan", "zhen", 2, 5, "kan"],
  [12, "水火既济", "After Completion", "kan", "li", 3, 6, "kan"],
  [13, "泽火革", "Revolution", "dui", "li", 4, 1, "kan"],
  [14, "雷火丰", "Abundance", "zhen", "li", 5, 2, "kan"],
  [15, "地火明夷", "Darkening of the Light", "kun", "li", 4, 1, "kan"],
  [16, "地水师", "The Army", "kun", "kan", 3, 6, "kan"],
  [17, "艮为山", "Keeping Still", "gen", "gen", 6, 3, "gen"],
  [18, "山火贲", "Grace", "gen", "li", 1, 4, "gen"],
  [19, "山天大畜", "Great Taming", "gen", "qian", 2, 5, "gen"],
  [20, "山泽损", "Decrease", "gen", "dui", 3, 6, "gen"],
  [21, "火泽睽", "Opposition", "li", "dui", 4, 1, "gen"],
  [22, "天泽履", "Treading", "qian", "dui", 5, 2, "gen"],
  [23, "风泽中孚", "Inner Truth", "xun", "dui", 4, 1, "gen"],
  [24, "风山渐", "Gradual Progress", "xun", "gen", 3, 6, "gen"],
  [25, "震为雷", "The Arousing", "zhen", "zhen", 6, 3, "zhen"],
  [26, "雷地豫", "Enthusiasm", "zhen", "kun", 1, 4, "zhen"],
  [27, "雷水解", "Deliverance", "zhen", "kan", 2, 5, "zhen"],
  [28, "雷风恒", "Duration", "zhen", "xun", 3, 6, "zhen"],
  [29, "地风升", "Pushing Upward", "kun", "xun", 4, 1, "zhen"],
  [30, "水风井", "The Well", "kan", "xun", 5, 2, "zhen"],
  [31, "泽风大过", "Great Exceeding", "dui", "xun", 4, 1, "zhen"],
  [32, "泽雷随", "Following", "dui", "zhen", 3, 6, "zhen"],
  [33, "巽为风", "The Gentle Wind", "xun", "xun", 6, 3, "xun"],
  [34, "风天小畜", "Small Taming", "xun", "qian", 1, 4, "xun"],
  [35, "风火家人", "The Family", "xun", "li", 2, 5, "xun"],
  [36, "风雷益", "Increase", "xun", "zhen", 3, 6, "xun"],
  [37, "天雷无妄", "Innocence", "qian", "zhen", 4, 1, "xun"],
  [38, "火雷噬嗑", "Biting Through", "li", "zhen", 5, 2, "xun"],
  [39, "山雷颐", "Nourishment", "gen", "zhen", 4, 1, "xun"],
  [40, "山风蛊", "Work on What Has Been Spoiled", "gen", "xun", 3, 6, "xun"],
  [41, "离为火", "The Clinging Fire", "li", "li", 6, 3, "li"],
  [42, "火山旅", "The Wanderer", "li", "gen", 1, 4, "li"],
  [43, "火风鼎", "The Cauldron", "li", "xun", 2, 5, "li"],
  [44, "火水未济", "Before Completion", "li", "kan", 3, 6, "li"],
  [45, "山水蒙", "Youthful Folly", "gen", "kan", 4, 1, "li"],
  [46, "风水涣", "Dispersion", "xun", "kan", 5, 2, "li"],
  [47, "天水讼", "Conflict", "qian", "kan", 4, 1, "li"],
  [48, "天火同人", "Fellowship", "qian", "li", 3, 6, "li"],
  [49, "坤为地", "The Receptive", "kun", "kun", 6, 3, "kun"],
  [50, "地雷复", "Return", "kun", "zhen", 1, 4, "kun"],
  [51, "地泽临", "Approach", "kun", "dui", 2, 5, "kun"],
  [52, "地天泰", "Peace", "kun", "qian", 3, 6, "kun"],
  [53, "雷天大壮", "Great Power", "zhen", "qian", 4, 1, "kun"],
  [54, "泽天夬", "Breakthrough", "dui", "qian", 5, 2, "kun"],
  [55, "水天需", "Waiting", "kan", "qian", 4, 1, "kun"],
  [56, "水地比", "Holding Together", "kan", "kun", 3, 6, "kun"],
  [57, "兑为泽", "The Joyous Lake", "dui", "dui", 6, 3, "dui"],
  [58, "泽水困", "Oppression", "dui", "kan", 1, 4, "dui"],
  [59, "泽地萃", "Gathering Together", "dui", "kun", 2, 5, "dui"],
  [60, "泽山咸", "Influence", "dui", "gen", 3, 6, "dui"],
  [61, "水山蹇", "Obstruction", "kan", "gen", 4, 1, "dui"],
  [62, "地山谦", "Modesty", "kun", "gen", 5, 2, "dui"],
  [63, "雷山小过", "Small Exceeding", "zhen", "gen", 4, 1, "dui"],
  [64, "雷泽归妹", "The Marrying Maiden", "zhen", "dui", 3, 6, "dui"]
];

export const HEXAGRAMS = rows.map(([number, nameZh, nameEn, upper, lower, shiLine, yingLine, palace]) => ({
  number,
  nameZh,
  nameEn,
  upper,
  lower,
  shiLine,
  yingLine,
  palace
}));

export const BRANCH_ELEMENTS = {
  子: "water", 丑: "earth", 寅: "wood", 卯: "wood", 辰: "earth", 巳: "fire",
  午: "fire", 未: "earth", 申: "metal", 酉: "metal", 戌: "earth", 亥: "water"
};

export const PALACE_BRANCHES = {
  qian: ["子", "寅", "辰", "午", "申", "戌"],
  zhen: ["子", "寅", "辰", "午", "申", "戌"],
  kan: ["寅", "辰", "午", "申", "戌", "子"],
  gen: ["辰", "午", "申", "戌", "子", "寅"],
  xun: ["丑", "亥", "酉", "未", "巳", "卯"],
  li: ["卯", "丑", "亥", "酉", "未", "巳"],
  kun: ["未", "巳", "卯", "丑", "亥", "酉"],
  dui: ["巳", "卯", "丑", "亥", "酉", "未"]
};

export const GENERATES = {
  wood: "fire",
  fire: "earth",
  earth: "metal",
  metal: "water",
  water: "wood"
};

export const CONTROLS = {
  wood: "earth",
  earth: "water",
  water: "fire",
  fire: "metal",
  metal: "wood"
};

export const SIX_BEASTS = ["青龙", "朱雀", "勾陈", "螣蛇", "白虎", "玄武"];

export const TOPIC_USEFUL_GOD = {
  career: "官鬼",
  authority: "官鬼",
  lawsuit: "官鬼",
  illness: "官鬼",
  wealth: "妻财",
  money: "妻财",
  asset: "妻财",
  love: "应爻",
  relationship: "应爻",
  marriage: "应爻",
  study: "父母",
  contract: "父母",
  house: "父母",
  family: "父母",
  friend: "兄弟",
  competition: "兄弟",
  child: "子孙",
  healing: "子孙",
  entertainment: "子孙",
  self: "世爻",
  decision: "世爻",
  general: "世爻"
};
