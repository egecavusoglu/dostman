#!/usr/bin/env node
const path = require("path");
const cwd = process.cwd();

const Dostman = require("./dostman");
const Request = require("./request");
const { readFile, writeFile } = require("./utils");

// For dev purposes
async function main() {
  const filePath = path.join(cwd, "src", "sample.dostman");
  const dostman = new Dostman(filePath);
  console.log(dostman);
  //   const chunk = readFile(filePath);

  //   const request = new Request(chunk);
  //   console.log(request);
  //   await request.execute();
  //   writeFile("./output.json", request.toString());

  //   console.log(request.toJson());
}

main();
