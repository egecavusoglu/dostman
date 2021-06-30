const logger = require('./logger');

const parseDecorator = (decorator, chunk) => {
    const regex = new RegExp(`(@${decorator})(.*?)(?=(@|$))`);
    // console.log(regex);
    const match = chunk.match(regex);
    if (!match) {
        logger.warn(`Unable to parse decorator ${decorator}`);
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
    parseDecorator,
    extractVariables,
};
