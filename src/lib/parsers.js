const { logger } = require('./logger');

/**
 *
 * @param {string} chunk: string
 * @returns {string} with all newlines, tabs and multiple spaces replaced by 1 whitespace.
 */
const removeSpaces = (chunk) => {
    chunk = chunk.replace(/(\r\n|\n|\r)/gm, ' '); // Remove all line breaks
    chunk = chunk.replace(/\s\s+/g, ' '); // Trim all whitespace to 1 space.
    return chunk;
};

/**
 *
 * @param {string} decorator expression that starts with @ eg. to extract @method => parseDecorator('method', chunk)
 * @param {string} chunk
 * @returns {string} the value of the decorator expression.
 */
const parseDecorator = (decorator, chunk) => {
    const regex = new RegExp(`(@${decorator})(.*?)(?=(@|$))`);
    const match = chunk.match(regex);
    if (!match || match.length < 1) {
        logger.warn(`Unable to parse decorator '${decorator}'`);
        return null;
    }
    const extracted = match[0].replace(`@${decorator} `, '').trim();
    return extracted;
};

/**
 * Returns variable expressions so that values can be injected.
 * @param {*} chunk string that will be searched
 * @returns array of variable expressions eg. [ {{my-variable}} , {{other-variable}}]
 */
const extractVariables = (chunk) => {
    const matches = chunk.match(/\{\{(.*?)\}\}/g);
    if (!matches) return [];
    return matches;
};

module.exports = {
    parseDecorator,
    extractVariables,
    removeSpaces,
};
