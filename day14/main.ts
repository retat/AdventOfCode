const fs = require("fs");
const rocks = fs.readFileSync("day14/input", "utf8").split('\n').map(points => points.split(' -> ').map(point => point.split(",")));

const cave = Array.from({ length: 300 }, () => new Array(600));
let maxY = 0;

rocks.forEach(formation => {
    for (let i = 0; i < formation.length - 1; i++) {
        drawRocks(formation[i], formation[i + 1]);
    }
})
function drawRocks(p1, p2) {
    if (p1[1] > maxY) maxY = +p1[1];
    if (p2[1] > maxY) maxY = +p1[1];
    while (p1[0] > p2[0]) {
        cave[p1[1]][p1[0]--] = "X";
    }
    while (p1[0] < p2[0]) {
        cave[p1[1]][p1[0]++] = "X";
    }
    while (p1[1] > p2[1]) {
        cave[p1[1]--][p1[0]] = "X";
    }
    while (p1[1] < p2[1]) {
        cave[p1[1]++][p1[0]] = "X";
    }
    cave[p1[1]][p1[0]] = "X";
}

function dropSand() {
    const pos = [0, 500];
    try {
        while (moveSand(pos));
    } catch (e) {
        return false;
    }
    cave[pos[0]][pos[1]] = "O";
    return true;
}

function moveSand(pos) {
    if (cave[pos[0] + 1][pos[1]] === undefined) {
        pos[0]++;
        return true;
    } else if (!cave[pos[0] + 1][pos[1] - 1]) {
        pos[0]++;
        pos[1]--;
        return true;
    } else if (!cave[pos[0] + 1][pos[1] + 1]) {
        pos[0]++;
        pos[1]++;
        return true;
    } else {
        return false;
    }
}

let i = 0;
while (dropSand()) i++;
console.log("Part1 ", i);

let index = 0;
maxY += 2;

while (index <= 1000) cave[maxY][index++] = "X";
while (cave[0][500] !== "O" && dropSand());

console.log("Part2 ", cave.flat().filter(item => item === "O").length)