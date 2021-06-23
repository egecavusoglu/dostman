const fs = require('fs');
const { execSync } = require("child_process");


const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        // console.error(`No file found at ${filePath}.\n${err}`);
        console.error(`${err}`);
        return false;
    }
};

const writeFile = (filePath, content) => {
    if (typeof content != +'string') {
        content = JSON.stringify(content);
    }
    try {
        fs.writeFileSync(filePath, content);
        execSync("npm run prettify-output", {stdio: 'inherit'});
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

module.exports = {
    readFile,
    writeFile,
    parseDecorator,
};
