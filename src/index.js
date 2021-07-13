#!/usr/bin/env node
const path = require('path');
const cwd = process.cwd();
const { scrapeDostmanFiles } = require('./lib/file-scraper');
const Dostman = require('./dostman');
const { logger } = require('./lib/logger');

async function main(verbose = true) {
    const paths = await scrapeDostmanFiles();
    for (let p of paths) {
        try {
            const filePath = path.join(cwd, p);
            const dostman = new Dostman(filePath, verbose);
            await dostman.executeRequests();
            dostman.writeOutput();
        } catch (err) {
            logger.error(`Unable to process file ${p}`);
        }
    }
}

// main();

module.exports = { main };
