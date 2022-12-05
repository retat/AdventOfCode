const fs = require("fs");

function parseInput() {
    const [stack, instructions] = fs.readFileSync("day5/input", "utf8").split('\n\n').map(x => x.split('\n'));
    const numbers = stack[stack.length - 1];
    const stacks = new Array();
    for (let i = 1; i <= +numbers[numbers.length - 2]; i++) {
        const pos = numbers.indexOf(i);
        const items = stack.reduce((arr, items, index) => {
            if (index !== stack.length - 1 && items.charAt(pos) !== " ") {
                arr.push(items.charAt(pos));
            }
            return arr;
        }, [])
        stacks.push(items.reverse());
    }
    const parsedInstructions = instructions.map(i => {
        const parts = i.split(" ");
        return {
            move: +parts[1],
            from: +parts[3],
            to: +parts[5],
        }
    })
    return [stacks, parsedInstructions];
}

function crateMover9000() {
    const [stacks, instructions] = parseInput();
    instructions.forEach(i => {
        while (i.move !== 0) {
            stacks[i.to - 1].push(stacks[i.from - 1].pop());
            i.move--;
        }
    })
    outputTopItems(stacks);
}

function crateMover9001() {
    const [stacks, instructions] = parseInput();
    instructions.forEach(i => {
        const items = stacks[i.from - 1].splice(-i.move, i.move);
        stacks[i.to - 1].push(...items);
    })
    outputTopItems(stacks);
}

function outputTopItems(stacks) {
    let topItems = ""
    stacks.forEach(stack => topItems += (stack[stack.length - 1]));
    console.log(topItems);
}

crateMover9000();
crateMover9001();