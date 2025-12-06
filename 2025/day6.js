const fs = require("fs");
let part1 = 0;
let part2 = 0;

let input = fs.readFileSync("input", "utf8").split("\n");
operations = input
  .pop()
  .split(/(?=\S)/)
  .map((op) => {
    return { op: op.trim(), validFor: op.length - 1 };
  });
const numberRow = input.map((numbers) => numbers.split(""));

let i = 0;
operations.forEach((entry) => {
  const newNumbers = new Array(entry.validFor).fill("");
  let result = 1;
  numberRow.forEach((row) => {
    for (let j = 0; j < entry.validFor; j++) {
      newNumbers[j] = newNumbers[j].concat(row[i + j]);
    }
    if (entry.op === "+") {
      part1 += +row.slice(i, i + entry.validFor).join("");
    } else {
      result *= +row.slice(i, i + entry.validFor).join("");
    }
  });
  if (entry.op === "*") {
    part1 += result;
    part2 += newNumbers.reduce((sum, number) => sum * +number, 1);
  } else {
    part2 += newNumbers.reduce((sum, number) => sum + +number, 0);
  }
  i += entry.validFor + 1;
});

console.log("Part1 ", part1);
console.log("Part2 ", part2);
