const fs = require("fs");
let errorLines = [];
let correctLines = 0;
let fixed = 0;

fs.readFileSync("input", "utf8")
  .split("\n")
  .map((line) => line.split(" ").map(Number))
  .forEach((line) => {
    if (!checkDiff(line)) {
      errorLines.push(line);
    } else {
      correctLines++;
    }
  });

function checkDiff(line) {
  let negative = false,
    positive = false;
  for (let i = 0; i < line.length - 1; i++) {
    const diff = line[i] - line[i + 1];
    if (diff > 0) positive = true;
    if (diff < 0) negative = true;
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3 || (positive && negative)) {
      return false;
    }
  }
  return true;
}

errorLines.filter((line) => {
  for (let i = 0; i < line.length; i++) {
    const modifiedLine = line.slice(0, i).concat(line.slice(i + 1));
    if (checkDiff(modifiedLine)) {
      fixed++;
      return false;
    }
  }
  return true;
});

console.log("Part 1:", correctLines);
console.log("Part 2:", correctLines + fixed);
