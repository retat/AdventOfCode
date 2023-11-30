const fs = require("fs");
const rounds = fs.readFileSync("day2/input", "utf8").split('\n');

let part1 = 0;
let part2 = 0;
const gamePoints = [0, 3, 6];
const shapePoints = [1, 2, 3];

rounds.forEach(round => {
    const [l, r] = round.split(" ");
    const [i, j] = l === "A" ? [1, 2] : l === "C" ? [2, 1] : [0,0];
    const pos = r === "Y" ? 1 : r === "Z" ? 2 : 0

    part1 += gamePoints[(i + pos) % 3] + shapePoints[pos];
    part2 += gamePoints[pos] + shapePoints[(j + pos) % 3];
});

console.log(part1);
console.log(part2);