const fs = require("fs");
const signs = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const joker = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
const hands = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((hand) => {
    return {
      equal: [...new Set(hand.split(" ")[0].split(""))]
        .map((card) => hand.split(" ")[0].match(new RegExp(card, "g")).length)
        .filter((amount) => amount > 1)
        .sort((a, b) => b - a),
      cards: hand.split(" ")[0],
      bid: +hand.split(" ")[1],
    };
  });

function compareCards(a, b, part2 = false) {
  if (getType(a.equal) === getType(b.equal)) {
    let result = 0;
    a.cards.split("").some((card, i) => {
      if (card !== b.cards.split("")[i]) {
        result = part2
          ? joker.indexOf(card) - joker.indexOf(b.cards.split("")[i])
          : signs.indexOf(card) - signs.indexOf(b.cards.split("")[i]);
        return true;
      }
    });
    return result;
  }
  return getType(a.equal) - getType(b.equal);
}

function getType(equalCards) {
  switch (equalCards[0]) {
    case 5:
      return 6;
    case 4:
      return 5;
    case 3:
      return equalCards.length > 1 ? 4 : 3;
    case 2:
      return equalCards.length > 1 ? 2 : 1;
    default:
      return 0;
  }
}

function findPairsWithJoker() {
  hands.forEach((hand) => {
    const jokers = (hand.cards.match(new RegExp("J", "g")) || []).length;
    if (
      jokers > 0 &&
      hand.equal[0] &&
      (hand.equal[0] !== jokers || hand.equal.length > 1)
    ) {
      hand.equal[0] += jokers;
    } else if (jokers === 1) {
      hand.equal.push(jokers + 1);
    } else if (jokers === hand.equal[0]) {
      hand.equal[0] += 1;
    }
    hand.equal[0] = Math.min(5, hand.equal[0]);
  });
}

hands.sort((a, b) => compareCards(a, b));
console.log(
  "Part1: ",
  hands.reduce((acc, curr, i) => (acc += curr.bid * ++i), 0),
);

findPairsWithJoker();
hands.sort((a, b) => compareCards(a, b, true));
console.log(
  "Part2: ",
  hands.reduce((acc, curr, i) => (acc += curr.bid * ++i), 0),
);
