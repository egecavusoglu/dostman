const path = require('path');
const cwd = process.cwd();
const { scrapeDostmanFiles } = require('../lib/file-scraper');
const Dostman = require('../dostman');
const { logger } = require('../lib/logger');

async function main(verbose = true) {
    const paths = await scrapeDostmanFiles();
    console.log('GOT FILES', paths);
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

module.exports = main;
