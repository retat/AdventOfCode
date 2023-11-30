import {readFileToNumberArray} from "../helper";

const input = readFileToNumberArray(1);
input.forEach(number1 => {
    input.forEach(number2 => {
        input.forEach(number3 => {
            // #bruteforce
            if (number1 + number2 + number3 === 2020) {
                console.log(number1 * number2 * number3);
            }
        })
    })
})

