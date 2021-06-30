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
            execSync(`npx prettier --write ${filePath}`);
        }
        return true;
    } catch (err) {
        console.error(`${err}`);
        return false;
    }
};

module.exports = {
    readFile,
    writeFile,
};
