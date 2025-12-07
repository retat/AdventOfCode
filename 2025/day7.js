const fs = require("fs");
let part1 = 0;
let part2;

const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((pos) => pos.split(""));

const start = input[0].findIndex((pos) => pos === "S");
const beamPositions = new Set();
let timelines = new Map();

// Part1
beamPositions.add(start);
input.forEach((line) => {
  beamPositions.forEach((pos) => {
    if (line[pos] === "^") {
      beamPositions
        .add(pos - 1)
        .add(pos + 1)
        .delete(pos);
      part1++;
    }
  });
});

// Part2
timelines.set(start, 1);
for (let line = 1; line < input.length; line++) {
  const updatedTimeline = new Map();
  timelines.forEach((count, pos) => {
    if (input[line][pos] === "^") {
      updatedTimeline.set(pos - 1, (updatedTimeline.get(pos - 1) || 0) + count);
      updatedTimeline.set(pos + 1, (updatedTimeline.get(pos + 1) || 0) + count);
    } else {
      updatedTimeline.set(pos, (updatedTimeline.get(pos) || 0) + count);
    }
  });
  timelines = updatedTimeline;
}

part2 = [...timelines.values()].reduce((sum, value) => sum + value, 0);

console.log("Part1 ", part1);
console.log("Part2 ", part2);
