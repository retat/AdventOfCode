const fs = require("fs");
let part1 = 0;

const [fresh, ingredients] = fs
  .readFileSync("input", "utf8")
  .split("\n\n")
  .map((entries) => entries.split("\n"));

ingredients.forEach((ingredient) => {
  const isFresh = fresh.find(
    (entry) =>
      +ingredient <= +entry.split("-")[1] &&
      +ingredient >= +entry.split("-")[0],
  );
  part1 += isFresh ? 1 : 0;
});

console.log("Part1 ", part1);

const freshWithoutOverlap = [];
const sortedRanges = fresh
  .map((entry) => entry.split("-").map((i) => +i))
  .sort((a, b) => a[0] - b[0]);

sortedRanges.forEach(([start, end]) => {
  if (
    !freshWithoutOverlap.length ||
    freshWithoutOverlap.at(-1).end < start - 1
  ) {
    freshWithoutOverlap.push({ start, end });
  } else {
    freshWithoutOverlap.at(-1).end = Math.max(
      freshWithoutOverlap.at(-1).end,
      end,
    );
  }
});

console.log(
  "Part2 ",
  freshWithoutOverlap.reduce(
    (sum, range) => sum + range.end - range.start + 1,
    0,
  ),
);
