#!/usr/bin/env node
const path = require("path");
const cwd = process.cwd();
const { readFile, writeFile } = require("./fs");
const Request = require("./request");

const filePath = path.join(cwd, "src", "sample.dostman");
const chunk = readFile(filePath);

const request = new Request(chunk);

writeFile("./output.json", request.toString());

console.log(request.toJson());
