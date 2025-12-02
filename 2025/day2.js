const fs = require("fs");
let part1 = 0;
let part2 = 0;
const ids = fs
  .readFileSync("input", "utf8")
  .split(",")
  .map((ins) => ins.split("-"));

function validateSeq(id, seq) {
  let i = 0,
    found = 0;
  while ((i = id.indexOf(seq, i)) !== -1) {
    found++;
    i += seq.length;
  }
  return found === id.length / seq.length;
}

function sequencePart1(id) {
  return id.length % 2 === 0 && validateSeq(id, id.slice(0, id.length / 2));
}

function sequencePart2(id) {
  for (let i = 1; i < id.length - 1 / 2; i++) {
    if (validateSeq(id, id.slice(0, i))) return true;
  }
  return false;
}

ids.forEach((range) => {
  for (let start = +range[0]; start <= +range[1]; start++) {
    if (sequencePart1(start + "")) part1 += +start;
    if (sequencePart2(start + "")) part2 += +start;
  }
});

console.log("part1 ", part1);
console.log("part2 ", part2);
