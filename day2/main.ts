const fs = require("fs");
const rounds = fs.readFileSync("day2/input", "utf8").split('\n');

let part1 = 0;
let part2 = 0;
rounds.forEach(round => {
    const shapes = round.split(" ");
    let gamePoints = [0, 3, 6];
    let shapePoints = [1, 2, 3];
    let indexPart1 = shapes[0] === "A" ? 1 : shapes[0] === "C" ? 2 : 0;
    let indexPart2 = shapes[0] === "A" ? 2 : shapes[0] === "C" ? 1 : 0;

    if (shapes[1] === "X") {
        part1 += gamePoints[indexPart1 % 3] + shapePoints[0];
        part2 += gamePoints[0] + shapePoints[indexPart2 % 3];
    } else if (shapes[1] === "Y") {
        part1 += gamePoints[(indexPart1 + 1) % 3] + shapePoints[1];
        part2 += gamePoints[1] + shapePoints[(indexPart2 + 1) % 3];
    } else {
        part1 += gamePoints[(indexPart1 + 2) % 3] + shapePoints[2];
        part2 += gamePoints[2] + shapePoints[(indexPart2 + 2) % 3];
    }
});
console.log(part1);
console.log(part2);