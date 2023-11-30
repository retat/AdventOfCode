import fs from "fs";

const input = readFileToStringArray(6)

function readFileToStringArray(day: number, fileName = 'input') {
    return fs.readFileSync(`/home/rene/Workspace/AdventOfCode2020/src/day${day}/${fileName}`)
        .toString()
        .split("\n\n")
}

function part1() {
    let count = 0
    input.forEach(group => {
        const j = 'z'.charCodeAt(0)
        for (let i = 'a'.charCodeAt(0); i <= j; i++) {
            if (group.includes(String.fromCharCode(i))) {
                count++
            }
        }
    })
    console.log(count)
}

function part2() {
    let count = 0
    input.forEach(group => {
            const passengers = group.split("\n")
            if (passengers.length !== 1) {
                let commonChars = passengers[0].split('')
                for (let i = 1; i < passengers.length; i++) {
                    if (passengers[i]) {
                        commonChars = commonChars.filter(char => passengers[i].includes(char))
                    }
                }
                count += commonChars.length
            } else {
                count += passengers[0].length
            }
        }
    )
    console.log(count)
}

part1()
part2()
