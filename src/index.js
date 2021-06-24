#!/usr/bin/env node
const path = require('path');
const cwd = process.cwd();

const Dostman = require('./dostman');
const { writeFile } = require('./utils');

const prettier = require('prettier');

// For dev purposes
async function main() {
    const filePath = path.join(cwd, 'src', 'sample.dostman');
    const dostman = new Dostman(filePath);

    // console.log(dostman);

    await dostman.executeRequests();
    console.log(dostman);
    dostman.writeOutput();
}

main();
