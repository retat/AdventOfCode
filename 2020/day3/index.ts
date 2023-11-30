import {readFileToStringArray} from "../helper";

const input = readFileToStringArray(3)
const columnInc = [1, 3, 5, 7, 1]
const rowInc = [1, 1, 1, 1, 2]

let column = 0
let row = 0
let trees = 0
let countedTrees = []

for (let i = 0; i < 5; i++) {
    while (row < input.length) {
        if (input[row].charAt(column % input[row].length) === '#') {
            trees++
        }
        column += columnInc[i]
        row += rowInc[i]
    }
    countedTrees.push(trees)
    column = row = trees = 0
}
console.log(countedTrees.reduce((a, b) => a * b, 1))
