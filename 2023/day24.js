const fs = require("fs");
let intersections = 0;
const lowerBound = 200000000000000;
const upperBound = 400000000000000;

const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((line) => {
    return {
      start: line
        .split(" @ ")[0]
        .trim()
        .split(", ")
        .map((n) => +n),
      incline: line
        .split(" @ ")[1]
        .trim()
        .split(", ")
        .map((n) => +n),
    };
  });

function futureAndBoundCheck(vx1, vx2, px1, px2, x, y) {
  return (
    ((vx1 > 0 && x > px1) || (vx1 < 0 && x < px1)) &&
    ((vx2 > 0 && x > px2) || (vx2 < 0 && x < px2)) &&
    x >= lowerBound &&
    x <= upperBound &&
    y >= lowerBound &&
    y <= upperBound
  );
}

function getIntersection(py1, px1, vy1, vx1, py2, px2, vy2, vx2) {
  const x =
    -(py1 - (vy1 / vx1) * px1 - (py2 - (vy2 / vx2) * px2)) /
    (vy1 / vx1 - vy2 / vx2);
  const y = (vy1 / vx1) * x + (py1 - (vy1 / vx1) * px1);
  if (futureAndBoundCheck(vx1, vx2, px1, px2, x, y)) {
    intersections++;
  }
}

for (let i = 0; i < input.length - 1; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const [px1, py1, pz1] = [...input[i].start];
    const [vx1, vy1, vz1] = [...input[i].incline];
    const [px2, py2, pz2] = [...input[j].start];
    const [vx2, vy2, vz2] = [...input[j].incline];
    getIntersection(py1, px1, vy1, vx1, py2, px2, vy2, vx2);
  }
}

console.log("Part1: ", intersections);
