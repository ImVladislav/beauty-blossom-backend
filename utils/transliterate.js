
const transliterate = (str, reverse = false) => {
  const chars = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ie",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "ji",
    й: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "`",
    ю: "iu",
    я: "ia",
  };

  if (!str) return "";

  if (!reverse) {
    // Трансліт з кирилиці в латиницю
    return str
      .toLowerCase()
      .split("")
      .map((char) => chars[char] || char)
      .join("");
  } else {
    // Зворотній трансліт: латиниця → кирилиця
    const reverseChars = Object.entries(chars).reduce((acc, [key, val]) => {
      if (val) acc[val] = key;
      return acc;
    }, {});

    // Сортуємо ключі за довжиною (від найдовших до найкоротших), щоб уникнути колізій типу "sh" vs "shch"
    const sortedKeys = Object.keys(reverseChars).sort(
      (a, b) => b.length - a.length
    );

    let result = str.toLowerCase();
    sortedKeys.forEach((key) => {
      const regex = new RegExp(key, "g");
      result = result.replace(regex, reverseChars[key]);
    });

    return result;
  }
};
module.exports = { transliterate };