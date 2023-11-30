import * as fs from 'fs';
import {inRange} from '../helper';

let passports: Array<Map<string, string>> = []
let neededFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

function readFileToStringArray(day: number, fileName = 'input') {
    return fs.readFileSync(`/home/rene/Workspace/AdventOfCode2020/src/day${day}/${fileName}`)
        .toString()
        .split("\n\n")
}

function mapPassports() {
    readFileToStringArray(4).forEach(passport => {
        let passportFields = new Map()
        passport.replace(/(\r\n|\n|\r)/gm, " ").split(" ").forEach(field => {
            passportFields.set(field.split(":")[0], field.split(":")[1])
        })
        passports.push(passportFields)
    })
}

function countValidPassports() {
    let valid = 0;
    passports.forEach(passport => {
        if (neededFields.every(key => passport.has(key)) && validateFields(passport)) {
            valid++
        }
    })
    console.log(valid)
}

function validateFields(passport: Map<string, string>) {
    let validHeight = false;
    if (passport.get('hgt').includes('cm')) {
        validHeight = inRange(parseInt(passport.get('hgt').split("cm")[0]), 150, 193)
    } else if (passport.get('hgt').includes('in')) {
        validHeight = inRange(parseInt(passport.get('hgt').split("in")[0]), 59, 76)
    }
    return inRange(+passport.get('byr'), 1920, 2002) &&
        inRange(+passport.get('iyr'), 2010, 2020) &&
        inRange(+passport.get('eyr'), 2020, 2030) &&
        validHeight &&
        RegExp('#([0-9]|[a-f]){6}').test(passport.get('hcl')) &&
        RegExp('^(amb|blu|brn|gry|grn|hzl|oth)$').test(passport.get('ecl')) &&
        passport.get('pid').length === 9
}

mapPassports()
countValidPassports()
