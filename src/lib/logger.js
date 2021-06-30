/**
 * Global logger for the cli.
 */

const chalk = require('chalk');
class Logger {
    verbose;
    constructor(verbose = true) {
        this.verbose = verbose;
    }

    consoleLog(m) {
        if (this.verbose) console.log(m);
    }

    log(m) {
        this.consoleLog(m);
    }

    info(m) {
        this.consoleLog(`ℹ️  ${m}`);
    }

    suc(m) {
        this.consoleLog(`✅ ${m}`);
    }

    warn(m) {
        this.consoleLog(`⚠️  ${m}`);
    }

    error(m) {
        this.consoleLog(`❌ ${m}`);
    }

    newLine() {
        this.consoleLog('');
    }

    value(m) {
        this.consoleLog(chalk.cyan(m));
    }

    json(j, colored = false) {
        let str = JSON.stringify(j, null, 2);
        if (colored) str = chalk.cyan(str);
        this.consoleLog(str);
    }
}

const logger = new Logger(true); // For const exports, a verbose logger you can use without constructing.

const myModule = (module.exports = Logger);
myModule.logger = logger;
