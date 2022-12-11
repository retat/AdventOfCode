const fs = require("fs");

function parseInput() {
    const monkeys = fs.readFileSync("day11/input", "utf8").split('\n\n').map(monkey => {
        const ins = monkey.split('\n');
        return {
            items: ins[1].split(":")[1].split(", ").map(item => +item),
            op: ins[2].split(": ")[1],
            test: +ins[3].split(": ")[1].split("by ")[1],
            true: +ins[4].split(": ")[1].split("monkey ")[1],
            false: +ins[5].split(": ")[1].split("monkey ")[1],
            inspectedItems: 0,
        }
    })
    const reducer = monkeys.reduce((acc, monkey) => {
        return acc * monkey.test
    }, monkeys[0].test)
    return [monkeys, reducer];
}

function run(rounds, monkeys, reducer) {
    let round = 0;
    while (round !== rounds) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                monkey.inspectedItems++;
                monkey.items = monkey.items.filter(i => i !== item);
                if (monkey.op.includes("*")) {
                    let value = +monkey.op.split("* ")[1];
                    if (!value) value = item;
                    item *= value;
                } else {
                    const value = +monkey.op.split("+ ")[1];
                    item += value;
                }
                item = reducer ? item % reducer : Math.floor(item / 3);
                if (item % monkey.test === 0) monkeys[monkey.true].items.push(item);
                else monkeys[monkey.false].items.push(item);
            })
        })
        round++;
    }
}

let [monkeys, reducer] = parseInput();
run(20, monkeys);
monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems);
console.log(monkeys[0].inspectedItems * monkeys[1].inspectedItems);

[monkeys, reducer] = parseInput();
run(10000, monkeys, reducer);
monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems)
console.log(monkeys[0].inspectedItems * monkeys[1].inspectedItems);