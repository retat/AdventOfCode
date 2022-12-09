const fs = require("fs");
const input = fs.readFileSync("day9/input", "utf8").split('\n').map(treeRow => treeRow.split(" "));

const head = [0, 0];
let tail = [0, 0];
let part1 = [tail];
let part2 = [tail];
const knots = new Array(9).fill([0, 0]);

input.forEach(ins => {
    const dir = (ins[0] === "R" || ins[0] === "L") ? 0 : 1;
    while (+ins[1] !== 0) {
        const prev = [head[0], head[1]];
        if (ins[0] === "R" || ins[0] === "U") head[dir]++;
        if (ins[0] === "L" || ins[0] === "D") head[dir]--;
        +ins[1]--;
        updateTail(prev);
        let prevKnot = [...head];
        for (let i = 0; i < knots.length; i++) {
            knots[i] = updateLongTail(knots[i], prevKnot);
            prevKnot = [...knots[i]];
            if (i === 8 && !part2.find(pos => pos[0] === prevKnot[0] && pos[1] === prevKnot[1])) part2.push(prevKnot);
        }
    }
});

function updateTail(prevHead) {
    const dX = Math.abs(head[0] - tail[0]);
    const dY = Math.abs(head[1] - tail[1]);
    const distance = Math.max(dX, dY);
    if (distance > 1) {
        tail = [...prevHead];
        if (!part1.find(pos => pos[0] === tail[0] && pos[1] === tail[1])) {
            part1.push(tail);
        }
    }
}

function updateLongTail(knot, prevKnot) {
    const dX = prevKnot[0] - knot[0];
    const dY = prevKnot[1] - knot[1];
    const distance = Math.max(Math.abs(dX), Math.abs(dY));
    if (distance > 1) {
        if (Math.abs(dX) >= 1 && Math.abs(dY) >= 1) {
            knot[0] += dX > 0 ? 1 : -1;
            knot[1] += dY > 0 ? 1 : -1;
        } else if (Math.abs(dX) >= 1) {
            knot[0] += dX > 0 ? 1 : -1;
        } else if (Math.abs(dY) >= 1) {
            knot[1] += dY > 0 ? 1 : -1;
        }
    }
    return [...knot];
}

console.log(part1.length);
console.log(part2.length);