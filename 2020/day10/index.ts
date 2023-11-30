import {readFileToNumberArray} from "../helper";

let input = readFileToNumberArray(10)
input.pop()
input.sort((a, b) => {
    return a - b
})

function part1(): number {
    input.unshift(0)
    const joltDifference = input.slice(1).map((n, i) => n - input[i])
    const ones = joltDifference.reduce((totalOne, curr) => {
        return curr === 1 ? totalOne + 1 : totalOne
    })
    const threes = joltDifference.reduce((totalThree, curr) => {
        return curr === 3 ? totalThree + 1 : totalThree
    })
    return ones * threes
}

console.log(part1())

input.shift()
const adapters = input.map(number => ({
    joltage: number,
    compatibleWith: [],
    count: null
}))
for (const adapter of adapters) {
    adapter.compatibleWith = adapters.filter(nextAdapter => nextAdapter.joltage > adapter.joltage && nextAdapter.joltage - adapter.joltage < 4)
}
const firstAdapter = {
    joltage: 0,
    compatibleWith: adapters.filter(nextAdapter => nextAdapter.joltage < 4),
    count: null
}

function part2(adapter) {
    if (adapter.count === null) {
        if (!adapter.compatibleWith.length) {
            adapter.count = input[input.length - 1] + 3 - adapter.joltage === 3 ? 1 : 0
        } else {
            adapter.count = adapter.compatibleWith.reduce((count, curr) => count + part2(curr), 0)
        }
    }
    return adapter.count;
}

console.log(part2(firstAdapter))
