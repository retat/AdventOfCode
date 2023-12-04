const fs = require("fs");
let points = 0;

const cards = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((card, index) => {
    let [winning, actual] = card
      .split(": ")[1]
      .split(" | ")
      .map((cards) =>
        cards
          .split(" ")
          .filter((x) => x.length > 0)
          .map((x) => +x),
      );
    const matches = actual.filter((card) => winning.indexOf(card) > -1).length;
    points += matches === 0 ? 0 : Math.pow(2, matches - 1);
    return {
      number: ++index,
      matches: matches,
    };
  });

function winCards(currentCard, newCards) {
  let i = 0;
  while (i++ < currentCard.matches) {
    const newCard = cards.find(
      (card) => card.number === currentCard.number + i,
    );
    newCards.push(newCard);
    winCards(newCard, newCards);
  }
  return newCards
}

console.log("Part1: ", points);
console.log("Part2: ", cards.reduce((acc, curr) => acc + winCards(curr, []).length , cards.length))