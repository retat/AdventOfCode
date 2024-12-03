const fs = require("fs");
const input = fs.readFileSync("input", "utf8");

const mul = /mul\((\d+),(\d+)\)/g;
const mul2 = /mul\((\d+),(\d+)\)/g;
const disable = /don't\(\)/g;
const enable = /do\(\)/g;

let match;
let sum = 0;

while ((match = mul.exec(input)) !== null) {
  const x = +match[1];
  const y = +match[2];
  sum += x * y;
}

const state = [];
while ((match = disable.exec(input)) !== null) {
  state.push({ index: match.index, type: "disable" });
}
while ((match = enable.exec(input)) !== null) {
  state.push({ index: match.index, type: "enable" });
}
state.sort((a, b) => a.index - b.index);

let sum2 = 0;
let isEnabled = true;
let currentIndex = 0;

while ((match = mul2.exec(input)) !== null) {
  const x = +match[1];
  const y = +match[2];

  while (
    currentIndex < state.length &&
    state[currentIndex].index < match.index
  ) {
    isEnabled = state[currentIndex].type === "enable";
    currentIndex++;
  }
  if (isEnabled) sum2 += x * y;
}

console.log("Part1:", sum);
console.log("Part2:", sum2);
