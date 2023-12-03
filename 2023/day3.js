const fs = require("fs");

const numbers = [];
const gears = [];

const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((row, i) => {
    row
      .replace(/\D/g, " ")
      .split(" ")
      .forEach((number) => {
        if (number !== "") {
          const prevEnd =
            numbers.at(-1) && numbers.at(-1).row === i
              ? numbers.at(-1).endColumn
              : 0;
          numbers.push({
            number: number,
            row: i,
            startColumn: Math.max(row.indexOf(number, prevEnd) - 1, 0),
            endColumn: Math.min(
              row.indexOf(number, prevEnd) + number.length,
              row.length - 1,
            ),
            valid: false,
          });
        }
      });
    return row.split("");
  });

// find valid numbers
numbers.forEach((number) => {
  let column = number.startColumn;
  while (column <= number.endColumn) {
    if (
      isSymbol(number.row - 1, column, number) ||
      isSymbol(number.row, column, number) ||
      isSymbol(number.row + 1, column, number)
    ) {
      number.valid = true;
    }
    column++;
  }
});

function isSymbol(row, column, number) {
  if (row < 0 || row > input.length - 1) {
    return false;
  }
  if (isNaN(input[row][column]) && input[row][column] !== ".") {
    if (input[row][column] === "*") addGear(row, column, +number.number);
    return true;
  }
}

function addGear(row, column, number) {
  const currentGear = gears.find(
    (gear) => gear.row === row && gear.column === column,
  );
  if (gears.length === 0 || !currentGear) {
    gears.push({
      row: row,
      column: column,
      number: number,
      ratio: undefined,
      valid: true,
    });
  } else if (!currentGear.ratio) {
    currentGear.ratio = currentGear.number * number;
  } else {
    currentGear.valid = false;
  }
}

console.log(
  "Part1:",
  numbers.reduce((acc, cur) => {
    if (cur.valid) {
      return acc + +cur.number;
    }
    return acc;
  }, 0),
);

console.log(
  "Part2:",
  gears.reduce((acc, cur) => {
    if (cur.valid && cur.ratio) {
      return acc + +cur.ratio;
    }
    return acc;
  }, 0),
);
