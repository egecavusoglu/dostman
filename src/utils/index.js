const fs = require('fs')

const readFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8')
    } catch (err) {
        // console.error(`No file found at ${filePath}.\n${err}`);
        console.error(`${err}`)
        return false
    }
}

const writeFile = (filePath, content) => {
    try {
        fs.writeFileSync(filePath, content)
        return true
    } catch (err) {
        console.error(`${err}`)
        return false
    }
}

const parseDecorator = (decorator, chunk) => {
    const regex = new RegExp(`(@${decorator})(.*?)(?=(@|$))`)
    // console.log(regex);
    const match = chunk.match(regex)
    if (!match) {
        return null
    }
    return match[0].replace(`@${decorator} `, '')
}

module.exports = {
    readFile,
    writeFile,
    parseDecorator,
}
