const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const Chunk = require("./Chunk");
console.log(cwd);
const filePath = path.join(cwd, "src", "sample.dostman");

let chunk = fs.readFileSync(filePath, "utf-8");

const request = new Chunk(chunk);
console.log(request);
