import {readFileToStringArray} from "../helper";

const input = readFileToStringArray(2);
let validPasswords = 0;
input.forEach(line => {
    if (line !== '') {
        const instructions = line.split(' ')
        const limits = instructions[0].split('-')
        const char = instructions[1].split(':')[0]
        const charAtFirstIndex = instructions[2].charAt(+limits[0] - 1) === char
        const charAtSecondIndex = instructions[2].charAt(+limits[1] - 1) === char
        if (charAtFirstIndex !== charAtSecondIndex) {
            validPasswords++
        }
    }
})
console.log(validPasswords)
