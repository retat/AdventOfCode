import {readFileToStringArray} from "../helper";

const input = readFileToStringArray(7)
input.pop()
const rules = new Map()
let count = 0
let found = false;

function parseRules() {
    input.forEach(bagRule => {
        const rootBagColor = bagRule.split("bags contain")[0].replace(/\s+$/g, '')
        let bagContent = bagRule.split("bags contain")[1]
            .split(',')
        bagContent = bagContent.map(bag => {
            return bag.replace(/\d+|^\s+|\.$/g, '')
                .replace(/^\s+/g, '')
                .split(' ').slice(0, 2).join(' ')
        })
        rules.set(rootBagColor, bagContent)
    })
}

function parseRulesWithAmount() {
    input.forEach(bagRule => {
        const rootBagColor = bagRule.split("bags contain")[0].replace(/\s+$/g, '')
        let bagContent = bagRule.split("bags contain")[1]
            .split(',')
        bagContent = bagContent.map(bag => {
            return bag.replace(/^\s+|\.$/g, '')
                .replace(/^\s+/g, '')
                .split(' ').slice(0, 3).join(' ');
        })
        rules.set(rootBagColor, bagContent)
    })
}

function findShinyGold(bag: string) {
    const allowedBagContent = rules.get(bag)
    if (allowedBagContent.some(content => content.includes('shiny gold'))) {
        found = true
    } else {
        allowedBagContent.forEach(content => {
            if (!content.includes("no")) {
                findShinyGold(content)
            }
        })
    }
}

function part1() {
    rules.forEach((bag, allowedBagContent) => {
        found = false
        findShinyGold(allowedBagContent)
        if (found) {
            count++
        }
    })
    console.log(count)
}

function countNeededBags(content) {
    count = 1;
    content.forEach(bag => {
        if (!bag.includes("no")) {
            count = count + +bag.split(' ')[0] * countNeededBags(rules.get(bag.split(' ').slice(1, 3).join(' ')))
        }
    })
    return count
}

function part2() {
    const shinyGoldBagContent = rules.get('shiny gold')
    console.log(countNeededBags(shinyGoldBagContent))
}

parseRules()
part1()
parseRulesWithAmount()
part2()

