const fs = require("fs");
const left = [];
const right = [];
fs.readFileSync("input", "utf8")
  .split("\n")
  .filter((l) => l.trim() !== "")
  .forEach((l) => {
    left.push(+l.slice(0, 5));
    right.push(+l.slice(8));
  });

left.sort();
right.sort();

let difference = 0;
let similarity = 0;

left.forEach((e, i) => {
  difference += Math.abs(e - right[i]);
  similarity += e * right.filter((i) => i === e).length;
});

console.log(difference);
console.log(similarity);
