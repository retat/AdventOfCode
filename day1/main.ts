const fs = require("fs");
const input = fs.readFileSync("day1/input", "utf8").split('\n\n');
let sums = new Array()

input.forEach(elf => {
    sums.push(elf.split('\n').map(x => +x).reduce((sum, foodItem) => { return sum + foodItem }))
});

sums = sums.sort((a, b) => { return a - b });

console.log(`Part1 ${sums.at(-1)}`);
console.log(`Part2 ${sums.at(-1) + sums.at(-2) + sums.at(-3)}`);