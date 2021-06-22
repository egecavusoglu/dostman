#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const Request = require("./Request");
console.log(cwd);
const filePath = path.join(cwd, "src", "sample.dostman");

let chunk = fs.readFileSync(filePath, "utf-8");

const request = new Request(chunk);
console.log(request);
