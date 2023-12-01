const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

console.log(
  "Part1:",
  input
    .map((value) => {
      const numbers = value.replace(/\D/g, "").split("");
      return Number(numbers.at(0) + numbers.at(-1));
    })
    .reduce((acc, cur) => acc + cur, 0),
);

console.log(
  "Part2:",
  input
    .map((value) => {
      const numbers = value
        .replaceAll("one", "o1e")
        .replaceAll("two", "t2o")
        .replaceAll("three", "t3e")
        .replaceAll("four", "f4r")
        .replaceAll("five", "f5e")
        .replaceAll("six", "s6x")
        .replaceAll("seven", "s7n")
        .replaceAll("eight", "e8t")
        .replaceAll("nine", "n9e")
        .replace(/\D/g, "")
        .split("");
      return Number(numbers.at(0) + numbers.at(-1));
    })
    .reduce((acc, cur) => acc + cur, 0),
);
