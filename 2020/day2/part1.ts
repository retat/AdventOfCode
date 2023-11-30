import {readFileToStringArray} from "../helper";

const input = readFileToStringArray(2);
let validPasswords = 0;
input.forEach(line => {
    if (line !== '') {
        const instructions = line.split(' ')
        const limits = instructions[0].split('-')
        const char = instructions[1].split(':')[0]
        const countedChar = countChar(char, instructions[2]);
        if (countedChar >= +limits[0] && countedChar <= +limits[1]) {
            validPasswords++;
        }
    }
})
console.log(validPasswords)

function countChar(char: string, word: string): number {
    return (word.match(new RegExp(char, "g")) || []).length;
}
