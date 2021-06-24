const {
    readFile,
    writeFile,
    parseDecorator,
    extractVariables,
} = require('../utils');
const Request = require('../request');

class Dostman {
    // Member variables
    filePath;
    file;
    config;
    variables;
    requests;

    constructor(filePath) {
        this.filePath = filePath;
        this.file = this.readFile(filePath);
        this.requests = [];
        this.parseFile();
    }

    readFile(filePath) {
        let file = readFile(filePath);
        if (!file) {
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
            console.error(err);
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
        for (let match of matches) {
            const key = match.substring(2, match.length - 2);
            let value = this.variables[key];
            if (value instanceof Function) {
                value = value();
            }
            chunk = chunk.replace(match, value);
            // console.log(value);
        }
        // console.log(chunk);
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

        writeFile('./output.json', output);
    }
}

module.exports = Dostman;
