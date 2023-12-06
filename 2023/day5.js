const fs = require("fs");
let seeds = undefined;
const rules = [];
const results = [];
fs.readFileSync("input", "utf8")
  .split("\n\n")
  .forEach((entry, index) => {
    if (index === 0) {
      seeds = entry
        .replace(/\D/g, " ")
        .trim()
        .split(" ")
        .map((seed) => +seed);
    } else {
      const rule = entry.split("\n").filter((line) => /\d/.test(line));
      rules.push(
        rule.map((rule) => {
          return {
            start: +rule.split(" ")[1],
            end: +rule.split(" ")[1] + +rule.split(" ")[2] - 1,
            add: +rule.split(" ")[0] - +rule.split(" ")[1],
          };
        }),
      );
    }
  });

function process(seeds) {
  const locations = [];
  seeds.forEach((seed) => {
    rules.forEach((rule, index) => {
      rule.some((ins) => {
        if (seed >= ins.start && seed <= ins.end) {
          seed += ins.add;
          return true;
        }
      });
      if (index === 6) locations.push(seed);
    });
  });
  return arrayMin(locations);
}

function processRanges() {
  for (let i = 0; i < seeds.length; i += 2) {
    const rangeLength = seeds[i + 1];
    const maxLength = 3000000;
    if (rangeLength > maxLength) {
      let start = seeds[i];
      let times = 0;
      while (times < Math.floor(rangeLength / maxLength)) {
        results.push(process(getRange(start, maxLength)));
        start += maxLength;
        times++;
      }
      results.push(process(getRange(start, rangeLength % maxLength)));
    } else {
      results.push(process(getRange(seeds[i], rangeLength)));
    }
  }
}

console.log("Part1: ", process(seeds));
processRanges();
console.log("Part2: ", arrayMin(results));

// helpers
function getRange(start, length) {
  return Array.from({ length: length }, (_, j) => start + j);
}

function arrayMin(arr) {
  return arr.reduce(function (p, v) {
    return p < v ? p : v;
  });
}
