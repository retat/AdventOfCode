import {readFileToStringArray} from "../helper";

const input = readFileToStringArray(5)
let maxSeatId = 0
let seatIds = []

input.forEach((boardingPass: string) => {
    if (boardingPass) {
        const rowRange = [0, 127]
        const seatRange = [0, 7]
        let seat = 0
        let row = 0
        for (let i = 0; i < boardingPass.length; i++) {
            switch (boardingPass.charAt(i)) {
                case 'F':
                    if ((rowRange[1] - rowRange[0]) === 1) {
                        row = rowRange[0]
                    }
                    rowRange[1] -= Math.round((rowRange[1] - rowRange[0]) / 2)
                    break
                case 'B':
                    if ((rowRange[1] - rowRange[0]) === 1) {
                        row = rowRange[1]
                    }
                    rowRange[0] += Math.round((rowRange[1] - rowRange[0]) / 2)
                    break
                case 'L':
                    if ((seatRange[1] - seatRange[0]) === 1) {
                        seat = seatRange[0]
                    }
                    seatRange[1] -= Math.round((seatRange[1] - seatRange[0]) / 2)
                    break
                case 'R':
                    if ((seatRange[1] - seatRange[0]) === 1) {
                        seat = seatRange[1]
                    }
                    seatRange[0] += Math.round((seatRange[1] - seatRange[0]) / 2)
                    break
            }
        }
        const seatId = row * 8 + seat
        seatIds.push(seatId)
        if (seatId > maxSeatId) {
            maxSeatId = seatId
        }
    }
})

console.log(maxSeatId)
seatIds = seatIds.sort((a, b) => a - b)
for (let i = 0; i < seatIds.length; i++) {
    if (seatIds[i] + 1 !== seatIds[i + 1]) {
        console.log("between " + seatIds[i] + "-" + seatIds[i + 1])
    }
}

