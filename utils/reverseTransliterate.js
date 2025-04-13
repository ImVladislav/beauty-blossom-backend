
const reverseMap = {
  ia: "я",
  iu: "ю",
  shch: "щ",
  zh: "ж",
  ts: "ц",
  ch: "ч",
  sh: "ш",
  kh: "х",
  ie: "є",
  yi: "ї",
  i: "і",
  y: "и",
  a: "а",
  b: "б",
  v: "в",
  h: "г",
  g: "ґ",
  d: "д",
  e: "е",
  z: "з",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  f: "ф",
};

const reverseTransliterate = (str) => {
  if (!str) return "";
  let result = str.toLowerCase();

  // Спочатку замінюємо багатолітерні комбінації
  const multiChar = ["shch", "kh", "sh", "ch", "ts", "zh", "ie", "iu", "ia"];
  for (const key of multiChar) {
    result = result.replace(new RegExp(key, "g"), reverseMap[key]);
  }

  // Потім однолітерні
  for (const [key, value] of Object.entries(reverseMap)) {
    if (!multiChar.includes(key)) {
      result = result.replace(new RegExp(key, "g"), value);
    }
  }

  return result;
};

module.exports = { reverseTransliterate };