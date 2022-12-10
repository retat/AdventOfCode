const fs = require("fs");
const input = fs.readFileSync("day10/input", "utf8").split('\n').map(ins => ins.split(" "));

let cycle = 0;
let x = 1;
let signalStrength = 0;
let crtOutput = "";

input.forEach(ins => {
    if (ins[0] === "noop") increaseTick();
    else if (ins[0] === "addx") {
        increaseTick();
        increaseTick()
        x += +ins[1];
    }
});

function increaseTick() {
    if (cycle === 40 || cycle === 80 || cycle === 120 || cycle === 160 || cycle === 200 || cycle === 240) {
        crtOutput += '\n'
    }
    cycle++;
    if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220) {
        signalStrength += x * cycle
    }
    const pos = (cycle - 1) % 40;
    if (Math.abs(x - pos) <= 1) {
        crtOutput += "#";
    } else {
        crtOutput += ".";
    }
}

console.log(signalStrength);
console.log(crtOutput);