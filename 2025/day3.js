const fs = require("fs");
let part1 = 0;
let part2 = 0;
const batteries = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((bank) => bank.split("").map((battery) => +battery));

batteries.forEach((bank) => {
  const firstMaxIndex = bank.indexOf(Math.max(...bank.slice(0, -1)));
  const secondMaxIndex = bank.indexOf(
    Math.max(...bank.slice(firstMaxIndex + 1)),
    firstMaxIndex + 1,
  );
  part1 += +(String(bank[firstMaxIndex]) + String(bank[secondMaxIndex]));

  let foundBatteries = "";
  let currMaxIndex = bank.indexOf(Math.max(...bank.slice(0, -11)));
  foundBatteries += String(bank[currMaxIndex]);

  for (let i = -10; i < 0; i++) {
    currMaxIndex = bank.indexOf(
      Math.max(...bank.slice(currMaxIndex + 1, i)),
      currMaxIndex + 1,
    );
    foundBatteries += String(bank[currMaxIndex]);
  }
  foundBatteries += String(
    bank[bank.indexOf(Math.max(...bank.slice(currMaxIndex + 1)), currMaxIndex)],
  );
  part2 += +foundBatteries;
});

console.log("Part1 ", part1);
console.log("Part2 ", part2);
