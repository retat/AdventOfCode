const fs = require("fs");
let removedRolls = 0;
let removed;
const grid = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((row) => row.split(""));

function checkPaperRoll(row, location) {
  const surroundings = [];
  if (grid[row - 1]) {
    surroundings.push(
      ...grid[row - 1].slice(Math.max(location - 1, 0), location + 2),
    );
  }
  if (grid[row + 1]) {
    surroundings.push(
      ...grid[row + 1].slice(Math.max(location - 1, 0), location + 2),
    );
  }
  if (grid[row][location + 1]) surroundings.push(grid[row][location + 1]);
  if (grid[row][location - 1]) surroundings.push(grid[row][location - 1]);
  if (surroundings.filter((location) => location === "@").length < 4) {
    grid[row][location] = "x";
    return 1;
  }
  return 0;
}

while (removed !== 0) {
  removed = 0;
  grid.forEach((row, rowIndex) => {
    row.forEach((location, locationIndex) => {
      if (location === "@") removed += checkPaperRoll(rowIndex, locationIndex);
    });
  });
  if (removedRolls === 0) console.log("Part1 ", removed);
  removedRolls += removed;
}

console.log("Part2 ", removedRolls);
