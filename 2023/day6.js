const fs = require("fs");
const input = fs.readFileSync("input", "utf8");

const [times, distances] = input.split("\n").map((line) => {
  return line
    .replace(/\D/g, " ")
    .trim()
    .split("  ")
    .map((value) => value.trim())
    .filter((x) => x !== "");
});

const racesPart1 = [];
times.forEach((time, i) =>
  racesPart1.push({
    time: time,
    distance: distances[i],
  }),
);

const racesPart2 = [{
  time: times.join(""),
  distance: distances.join("")
}]

function calcRaces(races) {
  let totalPossibilities = 1;
  races.forEach((race) => {
    let holdingTime = 1;
    let possibilities = 0;
    while (holdingTime < race.time) {
      const travelTime = race.time - holdingTime;
      const distance = travelTime * holdingTime;
      if (distance > race.distance) possibilities++;
      holdingTime++;
    }
    totalPossibilities *= possibilities;
  });
  return totalPossibilities;
}

console.log("Part1: ", calcRaces(racesPart1));
console.log("Part2: ", calcRaces(racesPart2));
