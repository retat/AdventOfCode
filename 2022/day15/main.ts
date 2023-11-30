const fs = require("fs");
const shift = 2000000;
const sensors = fs.readFileSync("day15/input", "utf8").split('\n').map(points => points.split(':').map(loc => {
    return {
        x: +loc.match(/(?<=x=).?\d+/g)[0] + shift,
        y: +loc.match(/(?<=y=).?\d+/g)[0] + shift
    }
}));

const tunnels = new Array(6000000);
const line = 2000000 + shift;
let limit = {
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

function findCoveredSections(simplified, checkLine) {
    sensors.forEach(sensor => {
        for (let i = -sensor[0].distance; i <= sensor[0].distance; i++) {
            if (!simplified && checkLine === sensor[0].y + i) {
                if (!Array.isArray(tunnels[sensor[0].y + i])) {
                    tunnels[sensor[0].y + i] = new Array(6000000);
                }
                drawCoveredSections(sensor[0].x, sensor[0].y + i, Math.abs(Math.abs(i) - sensor[0].distance))
            }
        }
        if (simplified && sensor[0].y <= limit.upper && sensor[0].y >= limit.lower) {
            if (!Array.isArray(tunnels[sensor[0].y])) {
                tunnels[sensor[0].y] = new Array(6000000);
            }
            drawCoveredSections(sensor[0].x, sensor[0].y, sensor[0].distance)
        }
    })
}

function drawCoveredSections(x, y, distance) {
    let i = 0;
    while (i <= distance) {
        tunnels[y][x + i] = "#";
        tunnels[y][x - i] = "#";
        i++;
    }
}

findCoveredSections(false, line);
console.log(tunnels[line].filter(loc => loc === "#").length);

findCoveredSections(true, 0);
let maxCount = 0;
let index = 0;

tunnels.forEach((field, i) => {
    const count = field.filter(loc => loc !== undefined).length;
    if (count > maxCount && i !== line) {
        index = i;
        maxCount = count;
    }
})

console.log("best line", index, maxCount);

findCoveredSections(false, index);

for (let x = limit.lower; x <= limit.upper; x++) {
    if (tunnels[index][x] !== "#") {
        console.log("found position at ", x);
    }
}