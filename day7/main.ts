const fs = require("fs");
const input = fs.readFileSync("day7/input", "utf8").split('\n');
const fileSystem = {
    name: "/",
    type: "dir",
    size: 0,
    content: new Array()
}
let line = 1;

function executeCommands(node, command) {
    if (command === "$ ls") {
        line = addContent(node, ++line);
        executeCommands(node, input[line]);
    } else if (command === "$ cd ..") {
        executeCommands(node.parent, input[++line]);
    } else if (command && command.includes("$ cd")) {
        executeCommands(node.content.find(node => node.name === command.split(" ")[2]), input[++line]);
    }
}

function addContent(node, line) {
    while (line < input.length && !input[line].includes("$")) {
        const [spec, name] = input[line].split(" ");
        node.content.push({
            name: name,
            type: spec === "dir" ? "dir" : "file",
            size: spec === "dir" ? 0 : +spec,
            content: spec === "dir" ? new Array() : "",
            parent: node
        });
        line++;
    }
    return line;
}

let part1 = 0;
function getDirSize(node) {
    if (node.type === "dir") {
        node.content.forEach(child => node.size += getDirSize(child));
        if (node.size <= 100000) part1 += node.size;
    }
    return node.size;
}

executeCommands(fileSystem, input[line]);
getDirSize(fileSystem);

console.log(`Part1: ${part1}`);

const sizeNeeded = Math.abs(70000000 - fileSystem.size - 30000000);
const directories = new Array();

function findDir(node) {
    if (node.type === "dir") {
        if (node.size >= sizeNeeded) directories.push(node.size);
        node.content.forEach(child => findDir(child));
    }
}

findDir(fileSystem);
console.log(`Part2: ${directories.sort((a, b) => a - b)[0]}`);