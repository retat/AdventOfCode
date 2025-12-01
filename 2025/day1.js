let dial = 50;
let part1 = 0;
let part2 = 0;
const fs = require("fs");
const ins = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((input) => {
    return {
      dir: input.startsWith("L") ? -1 : 1,
      val: +input.slice(1),
    };
  });

ins.forEach((ins) => {
  let clicks = ins.val;
  while (clicks !== 0) {
    dial += ins.dir;
    clicks--;
    if (dial === 0) {
      part2++;
    }
    if (dial >= 100) {
      dial = dial % 100;
      part2++;
    } else if (dial < 0) dial = dial + 100;
  }
  if (dial === 0) part1++;
});

console.log("Part 1: ", part1);
console.log("Part 2: ", part2);
