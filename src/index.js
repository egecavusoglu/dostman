#!/usr/bin/env node
const path = require('path');
const cwd = process.cwd();

const Dostman = require('./dostman');

// For dev purposes
async function main() {
    const filePath = path.join(cwd, 'src', 'sample.dostman');
    const dostman = new Dostman(filePath);

    await dostman.executeRequests();
    console.log(dostman);
    dostman.writeOutput();
}

main();
