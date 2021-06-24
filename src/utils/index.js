const fs = require('fs');
const { execSync } = require('child_process');

const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        // console.error(`No file found at ${filePath}.\n${err}`);
        console.error(`${err}`);
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
            execSync(`npx prettier --write ${filePath}`, { stdio: 'inherit' });
        }
        return true;
    } catch (err) {
        console.error(`${err}`);
        return false;
    }
};

const parseDecorator = (decorator, chunk) => {
    const regex = new RegExp(`(@${decorator})(.*?)(?=(@|$))`);
    // console.log(regex);
    const match = chunk.match(regex);
    if (!match) {
        return null;
    }
    return match[0].replace(`@${decorator} `, '');
};

/**
 * Returns variable expressions so that values can be injected.
 * @param {*} chunk string that will be searched
 * @returns array of variable expressions eg. [ {{my-variable}} , {{other-variable}}]
 */
const extractVariables = (chunk) => {
    const matches = chunk.match(/\{\{(.*?)\}\}/g);
    return matches;
};

module.exports = {
    readFile,
    writeFile,
    parseDecorator,
    extractVariables,
};
