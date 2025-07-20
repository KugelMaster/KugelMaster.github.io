let formatArr = (arr) => `const kanjiX = [\n    "` + Array.from({ length: Math.ceil(arr.length / 20) }, (_, i) => arr.slice(i * 20, i * 20 + 20).join('", "')).join('",\n    "') + '"\n];';

console.log([...$0.querySelectorAll(".infopanel")].map((a, i) => formatArr([...a.querySelectorAll(".kanji")].map(e => e.querySelector("a").innerHTML))).join("\n\n"));