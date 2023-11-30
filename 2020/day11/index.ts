import * as fs from 'fs';

function readFileToStringArray(day: number, fileName = 'input') {
    return fs.readFileSync(`/home/rene/Workspace/AdventOfCode2020/src/day${day}/${fileName}`)
        .toString()
        .replace(/(?:\r\n|\r|\n)/g, '')
}

const input = readFileToStringArray(11)
const lineLength = 93
let count = 0
let oldSeats: Array<boolean> = []
let seats = input.split('').map(seat => ({
    occupied: seat === '#',
    floor: seat === '.',
    occupiedAdjacentSeats: 0,
    column: count % lineLength,
    row: Math.floor(count++ / lineLength)
}))

function updateOccupiedAdjacentSeats(seats) {
    for (const seat of seats) {
        seat.occupiedAdjacentSeats = seats.filter(adjacent => Math.abs(adjacent.column - seat.column) <= 1 &&
            Math.abs(adjacent.row - seat.row) <= 1 && adjacent !== seat && !adjacent.floor && adjacent.occupied).length
    }
    return seats
}

function part1(seats) {
    oldSeats = []
    for (let i = 0; i < seats.length; i++) {
        oldSeats.push(seats[i].occupied)
        if (seats[i].occupiedAdjacentSeats === 0 && !seats[i].floor) {
            seats[i].occupied = true
        }
        if (seats[i].occupied && seats[i].occupiedAdjacentSeats >= 4) {
            seats[i].occupied = false
        }
    }
    seats = updateOccupiedAdjacentSeats(seats)
    if (!isOldCombination(seats)) {
        part1(seats)
    } else {
        let occupiedSeats = 0
        seats.forEach(seat => {
            if (seat.occupied) {
                occupiedSeats++
            }
        })
        console.log(occupiedSeats);
    }
}

function updateOccupiedVisibleSeats(seats) {
    for (let i = 0; i < seats.length; i++) {
        let hPlus = false
        let hMinus = false
        let vPlus = false
        let vMinus = false
        let dPlusPlus = false
        let dPlusMinus = false
        let dMinusMinus = false
        let dMinusPlus = false
        let finishedEveryDirection = false
        let radius = 1
        let occupiedAdjacentSeats = 0
        if (!seats[i].floor) {
            while (!finishedEveryDirection) {
                // look for horizontal seats
                if (!hPlus && !seats[i + radius]?.floor && seats[i + radius]?.row === seats[i]?.row) {
                    if (seats[i + radius]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    hPlus = true
                } else if (seats[i + radius]?.row !== seats[i]?.row) {
                    hPlus = true
                }
                if (!hMinus && !seats[i - radius]?.floor && seats[i - radius]?.row === seats[i]?.row) {
                    if (seats[i - radius]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    hMinus = true
                } else if (seats[i - radius]?.row !== seats[i]?.row) {
                    hMinus = true
                }

                // look for vertical seats
                if (!vMinus && !seats[i - (lineLength * radius)]?.floor && seats[i - (lineLength * radius)]?.column === seats[i]?.column) {
                    if (seats[i - (lineLength * radius)]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    vMinus = true
                } else if (seats[i - (lineLength * radius)]?.column !== seats[i]?.column) {
                    vMinus = true
                }
                if (!vPlus && !seats[i + (lineLength * radius)]?.floor && seats[i + (lineLength * radius)]?.column === seats[i]?.column) {
                    if (seats[i + (lineLength * radius)]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    vPlus = true
                } else if (seats[i + (lineLength * radius)]?.column !== seats[i]?.column) {
                    vPlus = true
                }

                // look for diagonal seats
                if (!dPlusPlus && !seats[i + (lineLength * radius) + radius]?.floor && seats[i + (lineLength * radius) + radius]?.column === seats[i]?.column + radius) {
                    if (seats[i + (lineLength * radius) + radius]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    dPlusPlus = true
                } else if (seats[i + (lineLength * radius) + radius]?.column !== seats[i]?.column + radius) {
                    dPlusPlus = true
                }
                if (!dPlusMinus && !seats[i + (lineLength * radius) - radius]?.floor && seats[i + (lineLength * radius) - radius]?.column === seats[i]?.column - radius) {
                    if (seats[i + (lineLength * radius) - radius]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    dPlusMinus = true
                } else if (seats[i + (lineLength * radius) - radius]?.column !== seats[i]?.column - radius) {
                    dPlusMinus = true
                }
                if (!dMinusMinus && !seats[i - (lineLength * radius) - radius]?.floor && seats[i - (lineLength * radius) - radius]?.column === seats[i]?.column - radius) {
                    if (seats[i - (lineLength * radius) - radius]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    dMinusMinus = true
                } else if (seats[i - (lineLength * radius) - radius]?.column !== seats[i]?.column - radius) {
                    dMinusMinus = true
                }
                if (!dMinusPlus && !seats[i - (lineLength * radius) + radius]?.floor && seats[i - (lineLength * radius) + radius]?.column === seats[i]?.column + radius) {
                    if (seats[i - (lineLength * radius) + radius]?.occupied) {
                        occupiedAdjacentSeats++
                    }
                    dMinusPlus = true
                } else if (seats[i - (lineLength * radius) + radius]?.column !== seats[i]?.column + radius) {
                    dMinusPlus = true
                }
                finishedEveryDirection = hPlus && hMinus && vPlus && vMinus && dPlusPlus && dPlusMinus && dMinusMinus && dMinusPlus
                radius++
            }
        }
        seats[i].occupiedAdjacentSeats = occupiedAdjacentSeats
    }

    return seats
}

function part2(seats) {
    oldSeats = []
    for (let i = 0; i < seats.length; i++) {
        oldSeats.push(seats[i].occupied)
        if (seats[i].occupiedAdjacentSeats === 0 && !seats[i].floor) {
            seats[i].occupied = true
        }
        if (seats[i].occupied && seats[i].occupiedAdjacentSeats >= 5) {
            seats[i].occupied = false
        }
    }
    seats = updateOccupiedVisibleSeats(seats)
    if (!isOldCombination(seats)) {
        part2(seats)
    } else {
        let occupiedSeats = 0
        seats.forEach(seat => {
            if (seat.occupied) {
                occupiedSeats++
            }
        })
        console.log(occupiedSeats);
    }
}

function isOldCombination(changedSeats) {
    for (let i = 0; i < changedSeats.length; i++) {
        if (oldSeats[i] !== changedSeats[i].occupied) {
            return false
        }
    }
    return true
}

// part1(seats)
part2(seats)
