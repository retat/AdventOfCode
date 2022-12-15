const fs = require("fs");
const shift = 2000000;
const sensors = fs.readFileSync("/Users/rene.borner/Workspace/aoc/AdventOfCode2022/day15/input", "utf8").split('\n').map(points => points.split(':').map(loc => {
    return {
        x: +loc.match(/(?<=x=).?\d+/g)[0] + shift,
        y: +loc.match(/(?<=y=).?\d+/g)[0] + shift
    }
}));

const tunnels = new Array(6000000);
const part1 = 2000000 + shift;
const limit = {
    lower: shift,
    upper: 4000000 + shift
};

sensors.forEach(sensor => {
    Object.assign(sensor[0], { distance: Math.abs(sensor[0].x - sensor[1].x) + Math.abs(sensor[0].y - sensor[1].y) })
    if (!Array.isArray(tunnels[sensor[0].y])) {
        tunnels[sensor[0].y] = new Array(sensor[0].x + sensor[0].distance)
    }
    if (!Array.isArray(tunnels[sensor[1].y])) {
        tunnels[sensor[1].y] = new Array(sensor[1].x + sensor[0].distance)
    }
    draw(sensor[0].x, sensor[0].y, "S");
    draw(sensor[1].x, sensor[1].y, "B");
})

function draw(x, y, sign) {
    tunnels[y][x] = sign;
}

function findCoveredSections(part2) {
    sensors.forEach(sensor => {
        for (let i = -sensor[0].distance; i <= sensor[0].distance; i++) {
            // only draw in needed line for part1
            if (!part2 && part1 === sensor[0].y + i) {
                if (!Array.isArray(tunnels[sensor[0].y + i])) {
                    tunnels[sensor[0].y + i] = new Array(sensor[0].x + Math.abs(Math.abs(i) - sensor[0].distance));
                }
                drawCoveredSections(sensor[0].x, sensor[0].y + i, Math.abs(Math.abs(i) - sensor[0].distance))
            } else if (part2 && (sensor[0].y + i <= limit.upper && sensor[0].y + i >= limit.lower)) {
                if (!Array.isArray(tunnels[sensor[0].y + i])) {
                    tunnels[sensor[0].y + i] = new Array(sensor[0].x + Math.abs(Math.abs(i) - sensor[0].distance));
                }
                drawCoveredSections(sensor[0].x, sensor[0].y + i, Math.abs(Math.abs(i) - sensor[0].distance))
            }
        }
    })
}


function drawCoveredSections(x, y, distance) {
    let i = 0;
    while (i <= distance) {
        if (!tunnels[y][x + i]) {
            tunnels[y][x + i] = "#";
        }
        i++;
    }
    i = 0;
    while (i <= distance) {
        if (!tunnels[y][x - i]) {
            tunnels[y][x - i] = "#";
        }
        i++;
    }
}

findCoveredSections(false);
const row = part1;
console.log(tunnels[row].filter(loc => loc === "#").length);

findCoveredSections(true);
for (let i = limit.lower; i <= limit.upper; i++) {
    for (let j = limit.lower; j <= limit.upper; j++) {
        if (!tunnels[i][j]) {
            console.log("found position at ", i, j);
        }
    }
}