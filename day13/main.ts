const fs = require("fs");
const pairs = fs.readFileSync("day13/input", "utf8").split('\n\n').map((pair) => pair.split('\n').map((signal) => eval(signal)));

function compare(left, right, part2) {
    if (!Array.isArray(left) && !Array.isArray(right)) {
        return part2 ? left - right : left - right === 0 ? undefined : left - right < 0;
    }
    [left, right] = [left, right].map(data => Array.isArray(data) ? data : [data]).map(array => JSON.parse(JSON.stringify(array)));
    while (left.length !== 0 && right.length !== 0) {
        const result = compare(left.shift(), right.shift(), part2);
        if (result !== undefined) return result;
    }
    if (left.length !== 0) return part2 ? 1 : false;
    if (right.length !== 0) return part2 ? -1 : true;
    return part2 ? 0 : undefined;
}

function findKeys(pairs) {
    const dividerPackets = [[[2]], [[6]]];
    const sortedPackets = sort(JSON.parse(JSON.stringify(pairs)).flat().concat(dividerPackets));
    const keys = dividerPackets.map(key => sortedPackets.findIndex(signal => JSON.stringify(signal) === JSON.stringify(key))).map(key => ++key);
    return keys;
};

function sort(packets) {
    let change;
    while (change === true || change === undefined) {
        change = false;
        for (let i = 0; i < packets.length - 1; i++) {
            if (compare(packets[i + 1], packets[i], false)) {
                change = true;
                const p = packets[i];
                packets[i] = packets[i + 1];
                packets[i + 1] = p;
            }
        }
    }
    return packets;
}

console.log(JSON.parse(JSON.stringify(pairs)).map(([a, b]) => compare(a, b, false)).reduce((sum, test, i) => (test ? sum + ++i : sum)));
console.log(findKeys(pairs).reduce((a, b) => a * b));