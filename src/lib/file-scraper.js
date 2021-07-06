const glob = require('glob');
const { fileExtension } = require('../config');
const { logger } = require('./logger');
/**
 * Scrapes all .dostman files
 * @returns file paths as array.
 */
const scrapeDostmanFiles = async () => {
    const paths = glob.sync(`**/*.${fileExtension}`);
    if (!paths || paths.length < 1) {
        logger.info('No .dostman files were found.');
    }
    logger.suc('Found files');
    for (let p of paths) {
        logger.colored(`- ${p}`, 'yellow');
    }
    return paths;
};

module.exports = { scrapeDostmanFiles };
