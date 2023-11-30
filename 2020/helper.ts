import * as fs from 'fs';

export function readFileToNumberArray(day: number, fileName = 'input') {
    return fs.readFileSync(`/home/rene/Workspace/AdventOfCode2020/src/day${day}/${fileName}`)
        .toString()
        .split("\n")
        .map(x => +x);
}

export function readFileToStringArray(day: number, fileName = 'input') {
    return fs.readFileSync(`/home/rene/Workspace/AdventOfCode2020/src/day${day}/${fileName}`)
        .toString()
        .split("\n")
}

export function inRange(x: number, min: number, max: number) {
    return ((x - min) * (x - max) <= 0);
}

export function countChar(char: string, word: string): number {
    return (word.match(new RegExp(char, "g")) || []).length;
}
