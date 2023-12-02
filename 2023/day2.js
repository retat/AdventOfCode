const fs = require("fs");

let invalidGames = 0;
const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};
let power = 0;

fs.readFileSync("input", "utf8")
  .split("\n")
  .map((game) => {
    let isGameValid = true;
    const neededCubes = {
      red: 0,
      green: 0,
      blue: 0,
    };
    game
      .split(": ")[1]
      .split("; ")
      .map((sets) => {
        sets.split(", ").map((set) => {
          const gameSet = {
            amount: +set.split(" ")[0],
            color: set.split(" ")[1],
          };
          if (availableCubes[gameSet.color] < gameSet.amount)
            isGameValid = false;
          if (neededCubes[gameSet.color] < gameSet.amount)
            neededCubes[gameSet.color] = gameSet.amount;
        });
      });
    if (isGameValid)
      invalidGames += Number(game.split(": ")[0].replace(/\D/g, ""));
    power += neededCubes.red * neededCubes.green * neededCubes.blue;
  });

console.log("Part1: ", invalidGames);
console.log("Part2: ", power);
