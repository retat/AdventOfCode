import {readFileToNumberArray} from "../helper";

const input = readFileToNumberArray(9)
input.pop()

for (let i = 25; i < input.length; i++) {
    const preamble = input.slice(i - 25, i).sort((a, b) => {
        return a - b
    })
    if (!isSumPossible(input[i], preamble)) {
        console.log(input[i])
    }
}

function isSumPossible(result: number, preamble: Array<number>): boolean {
    let high = preamble.length - 1
    let low = 0
    let sum = preamble[low] + preamble[high]
    while (low < high && sum !== result) {
        if (sum < result) {
            low++
        } else {
            high--
        }
        sum = preamble[low] + preamble[high]
    }
    return sum === result;
}

function findContiguousSet() {
    const goal = 10884537
    let sum = 0
    let i = 0
    for (; i < input.length; i++) {
        sum = input[i]
        let j = i
        while (sum < goal) {
            j++
            sum += input[j]
        }
        if (sum === goal) {
            const subArray = input.slice(i, j + 1).sort((a, b) => {
                return a - b
            })
            console.log(subArray[0] + subArray[subArray.length - 1])
        }
        sum = 0
    }
}
findContiguousSet()
