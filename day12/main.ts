const fs = require("fs");
const input = fs.readFileSync("day12/input", "utf8").split("\n");

let start, end;
const grid = input.map((line, y) => line.split('').map((loc, x) => {
    if (loc === "E") {
        loc = "z";
        end = { x: x, y: y };
    } else if (loc === "S") {
        loc = "a";
        start = { x: x, y: y };
    }
    return loc.charCodeAt(0) - 97;
}))

let distances = Array.from({ length: input.length }, () => new Array(grid[0].length))

function findPath(x, y, count) {
    if (distances[y][x] <= count) return;
    distances[y][x] = count;
    getItems(x, y).forEach(adj => findPath(adj.x, adj.y, count + 1));
}

function getItems(x, y) {
    const items = new Array();
    if (x > 0 && grid[y][x - 1] <= grid[y][x] + 1) items.push({ x: x - 1, y: y });
    if (x < grid[0].length - 1 && grid[y][x + 1] <= grid[y][x] + 1) items.push({ x: x + 1, y: y });
    if (y > 0 && grid[y - 1][x] <= grid[y][x] + 1) items.push({ x: x, y: y - 1 });
    if (y < grid.length - 1 && grid[y + 1][x] <= grid[y][x] + 1) items.push({ x: x, y: y + 1 });
    return items;
}

function findMinDistance(distance) {
    distances = Array.from({ length: input.length }, () => new Array(grid[0].length));
    grid.forEach((line, y) => line.forEach((loc, x) => {
        if (loc !== 0) return;
        findPath(x, y, 0);
        distance = Math.min(distance, distances[end.y][end.x]);
    }))
    return distance;
}

findPath(start.x, start.y, 0);
console.log(`Part1: ${distances[end.y][end.x]}`);
console.log(`Part2: ${findMinDistance(distances[end.y][end.x])}`);