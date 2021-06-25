const glob = require('glob');
const { fileExtension } = require('../config');

/**
 * Scrapes all .dostman files
 * @returns file paths as array.
 */
const scrapeDostmanFiles = async () => {
    return glob.sync(`**/*.${fileExtension}`);
};

module.exports = { scrapeDostmanFiles };
