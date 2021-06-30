/**
 * Global logger for the cli.
 */
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

    json(j) {
        this.consoleLog(JSON.stringify(j, null, 2));
    }
}

// const logger = new Logger();

module.exports = Logger;
