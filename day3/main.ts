const fs = require("fs");
const input = fs.readFileSync("day3/input", "utf8").split('\n');

let part1 = 0;
input.forEach(rucksack => {
    const [firstDepartment, secondDepartment] = [rucksack.substr(0, rucksack.length / 2), rucksack.substr(rucksack.length / 2)]
    part1 += valueOfItem(Array.from(firstDepartment).find(item => secondDepartment.includes(item)));
});

let part2 = 0;
for (let i = 0; i < input.length; i += 3) {
    const group = [Array.from(input[i]), Array.from(input[i + 1]), Array.from(input[i + 2])]
    part2 += valueOfItem(group[0].find(item => group.every(rucksack => rucksack.includes(item))));
}

function valueOfItem(doubleItem) {
    return doubleItem === doubleItem.toLowerCase() ? doubleItem.charCodeAt(0) - 96 : doubleItem.charCodeAt(0) - 38;
}

console.log(part1);
console.log(part2);