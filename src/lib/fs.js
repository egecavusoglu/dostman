const fs = require('fs');
const { execSync } = require('child_process');
const { logger } = require('./logger');

const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        logger.error(`${err}`);
        return false;
    }
};

const writeFile = (filePath, content, prettify = true) => {
    if (typeof content != +'string') {
        content = JSON.stringify(content);
    }
    try {
        fs.writeFileSync(filePath, content, 'utf8', { flag: 'wx' });
        if (prettify) {
            execSync(`npx prettier --write ${filePath}`);
        }
        logger.log(`✏️ Writing file output to ${filePath}`);
        return true;
    } catch (err) {
        logger.error(`Unable to write file to ${filePath}. ${err}`);
        return false;
    }
};

module.exports = {
    readFile,
    writeFile,
};
