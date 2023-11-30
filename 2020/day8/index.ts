import {readFileToStringArray} from "../helper";

const input = readFileToStringArray(8)
input.pop()
let instructions = input.map(instruction => instruction.split(' '))
let acc = 0
let index = 0
let replaceIndex = 0
let replace = 'jmp'
let replacement = 'nop'
runInstruction(instructions[index])

function replaceInstruction() {
    instructions = input.map(instruction => instruction.split(' '))
    acc = 0
    index = 0
    let notFound = true
    if (replaceIndex === instructions.length) {
        replace = 'nop'
        replacement = 'jmp'
        replaceIndex = 0
    }
    while (replaceIndex < instructions.length && notFound) {
        if (instructions[replaceIndex][0] === replace) {
            notFound = false
            instructions[replaceIndex][0] = replacement
            replaceIndex++
            setTimeout(function () {
                runInstruction(instructions[0])
            }, 0)
        } else {
            replaceIndex++
        }
    }
}

function runInstruction(instruction) {
    if (index < instructions.length && instructions[index] !== 'executed') {
        instructions[index] = 'executed'
        switch (instruction[0]) {
            case 'nop':
                index++
                break
            case 'acc':
                acc += +instruction[1]
                index++
                break
            case 'jmp':
                index += +instruction[1]
                break
        }
        runInstruction(instructions[index])
    } else if (instructions[index] === 'executed') {
        replaceInstruction();
    } else {
        console.log(acc)
    }
}
