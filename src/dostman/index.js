const { readFile, writeFile } = require('../lib/fs');
const { parseDecorator, extractVariables } = require('../lib/parsers');
const Request = require('../request');
const Logger = require('../lib/logger');
class Dostman {
    // Member variables
    filePath;
    fileName;
    file;
    config;
    variables;
    requests;
    logger;

    constructor(filePath, verbose = true) {
        this.logger = new Logger(verbose);
        this.filePath = filePath;
        this.fileName = filePath.split('/').slice(-1).pop();
        this.logger.newLine();
        this.logger.info(`Processing ${this.fileName}`);
        this.file = this.readFile(filePath);
        this.requests = [];
        this.parseFile();
    }

    readFile(filePath) {
        let file = readFile(filePath);
        if (!file) {
            this.logger.error(`Unable to read file ${filePath}`);
            throw new Error('Unable to read file.');
        }

        return this.cleanFile(file);
    }

    cleanFile(file) {
        file = file.replace(/(\r\n|\n|\r)/gm, ' '); // Remove all line breaks
        file = file.replace(/\s\s+/g, ' '); // Trim all whitespace to 1 space.
        return file;
    }

    parseFile() {
        const chunks = this.getChunks();
        chunks.forEach((c) => {
            if (this.isConfigChunk(c)) {
                this.parseConfig(c);
                return;
            }
            const req = this.parseRequest(c);
            if (req) this.requests.push(req);
        });
    }

    isConfigChunk(chunk) {
        return chunk.includes('@config');
    }

    getChunks() {
        return this.file.split('###');
    }

    parseConfig(chunk) {
        this.logger.info('Parsing @config snippet...');
        const config = parseDecorator('config', chunk);
        this.config = config;
        this.evalConfig(config);
        return config;
    }

    evalConfig(configString) {
        try {
            const vars = eval(configString);
            this.variables = vars;
            return true;
        } catch (err) {
            throw new Error('Unable to evaluate config snippet.');
        }
    }

    parseRequest(chunk) {
        try {
            chunk = this.injectVariables(chunk);
            const request = new Request(chunk);
            return request;
        } catch (err) {
            this.logger.error(`${err}`);
            return false;
        }
    }

    async executeRequests() {
        for (let req of this.requests) {
            await req.execute();
        }
    }

    injectVariables(chunk) {
        const matches = extractVariables(chunk);
        if (!matches || matches.length < 1) {
            return chunk;
        }
        this.logger.log('Injecting Variables...');
        for (let match of matches) {
            const key = match.substring(2, match.length - 2);
            let value = this.variables[key];
            if (value instanceof Function) {
                value = value();
            }
            this.logger.value(`${key} = ${value}`);
            chunk = chunk.replace(match, value);
        }
        return chunk;
    }

    writeOutput() {
        const requestsAsJson = [];
        for (let req of this.requests) {
            requestsAsJson.push(req.toJson());
        }
        const output = {
            requests: requestsAsJson,
        };

        writeFile(`${this.filePath}.json`, output);
    }
}

module.exports = Dostman;
