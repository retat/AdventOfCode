const fs = require("fs");
const input = fs.readFileSync("day6/input", "utf8").split('');

function findMarker(length) {
    for (let i = length; i <= input.length; i++) {
        const seq = input.slice(i - length, i);
        if (seq.every(char => seq.filter(c => c === char).length === 1)) {
            return i;
        }
    }
}

console.log(findMarker(4));
console.log(findMarker(14));