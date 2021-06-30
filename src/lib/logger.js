/**
 * Global logger for the cli.
 * Use as follows:
 * logger.info("message");
 * logger.warn("message");
 * logger.error("message");
 */

const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const symbols = {
    info: '✅',
    warn: '⚠️ ',
    error: '❌',
};

const myFormat = format((info, opts) => {
    // const level = info.level;
    // console.log(typeof level);
    info.level = symbols[info.level];
    return info;
});

const logger = winston.createLogger({
    format: combine(myFormat()),
    transports: [
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

module.exports = logger;
