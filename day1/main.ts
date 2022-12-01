const fs = require("fs");
const input = fs.readFileSync("day1/input", "utf8").split('\n\n');

const sums = input.reduce((sum, elf) => {
    sum.push(elf.split('\n').reduce((sum, foodItem) => { return sum + +foodItem }, 0));
    return sum;
}, []);

sums.sort((a, b) => { return a - b });

console.log(`Part1 ${sums.at(-1)}`);
console.log(`Part2 ${sums.at(-1) + sums.at(-2) + sums.at(-3)}`);