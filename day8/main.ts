const fs = require("fs");
const trees = fs.readFileSync("day8/input", "utf8").split('\n').map(treeRow => treeRow.split("").map(tree => +tree));

let visibleTrees = 0;
const scenicScores = new Array();

trees.forEach((treeRow, row) => {
    treeRow.forEach((tree, column) => {
        const topTrees = row > 0 ? trees.slice(0, row).map(row => row[column]) : [];
        const bottomTrees = row < trees.length ? trees.slice(row + 1, trees.length).map(row => row[column]) : [];
        const leftTrees = column > 0 ? treeRow.slice(0, column) : [];
        const rightTrees = column < treeRow.length ? treeRow.slice(column + 1, treeRow.length) : [];

        if (Math.min(Math.max(...topTrees), Math.max(...bottomTrees), Math.max(...leftTrees), Math.max(...rightTrees)) < tree) visibleTrees++;

        scenicScores.push(distance(topTrees.reverse(), tree) * distance(bottomTrees, tree) *
            distance(leftTrees.reverse(), tree) * distance(rightTrees, tree));
    })
});

function distance(trees, tree) {
    const index = trees.findIndex(i => i >= tree);
    return index === -1 ? trees.length : index + 1;
}

console.log(`Part1: ${visibleTrees}`);
console.log(`Part2: ${Math.max(...scenicScores) }`);