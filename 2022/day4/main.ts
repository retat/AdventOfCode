const fs = require("fs");
const input = fs.readFileSync("day4/input", "utf8").split('\n').map(x => x.split(",").map(x => x.split("-").map(x => +x)));

let contained = 0;
let overlap = 0;
input.forEach(assignment => {
    const [fl, fu] = assignment[0];
    const [sl, su] = assignment[1];
    if (fu >= su && fl <= sl || fu <= su && fl >= sl) contained++;
    else if (fu <= su && fu >= sl || fl >= sl && fl <= su) overlap++;
});
console.log(contained);
console.log(contained + overlap);