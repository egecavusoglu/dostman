const axios = require('axios');
const { parseDecorator } = require('../lib/parsers');
const Logger = require('../lib/logger');

class Request {
    method;
    url;
    headers;
    body;
    desc;
    response;
    error;
    logger;

    constructor(chunk, verbose = true) {
        this.logger = new Logger(verbose);
        const { method, url, headers, body, desc } = this.parseChunk(chunk);
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.body = body;
        this.desc = desc;
    }

    async execute() {
        try {
            const { status, data } = await axios({
                method: this.method,
                url: this.url,
                data: this.body,
                headers: this.headers,
            });
            this.response = {
                status,
                data,
            };
            this.logger.suc(`Executed ${this.method} ${this.url}`);
            return true;
        } catch (err) {
            // const { status, message } = err?.response;
            this.logger.error(`Error with ${this.method} ${this.url}`);
            this.error = true;
            return false;
        }
    }

    parseChunk(chunk) {
        this.logger.info('Parsing Request:');
        chunk = chunk.replace(/(\r\n|\n|\r)/gm, ' '); // Remove all line breaks
        chunk = chunk.replace(/\s\s+/g, ' '); // Trim all whitespace to 1 space.
        return {
            desc: this.parseDesc(chunk),
            method: this.parseMethod(chunk),
            url: this.parseUrl(chunk),
            headers: this.parseHeaders(chunk),
            body: this.parseBody(chunk),
        };
    }

    parseMethod(chunk) {
        this.logger.log(`[2/5] Parsing method...`);
        let method = parseDecorator('method', chunk);
        this.logger.value(`${method}`);
        method = this.trimString(method);
        this.method = method;
        return method;
    }

    parseUrl(chunk) {
        this.logger.log(`[3/5] Parsing URL...`);
        let url = parseDecorator('url', chunk);
        url = this.trimString(url);
        this.logger.value(`${url}`);
        return url;
    }

    parseHeaders(chunk) {
        this.logger.log(`[4/5] Parsing Headers...`);
        let headers = parseDecorator('headers', chunk);
        headers = headers.split(','); // Seperate into array with ","
        const headersObject = {};
        headers.forEach((h, ind) => {
            const item = headers[ind].split(':');
            const key = item[0].trim();
            const value = item[1].trim();
            headersObject[key] = value;
        });
        this.logger.json(headersObject, true);
        return headersObject;
    }

    parseBody(chunk) {
        this.logger.log(`[5/5] Parsing Body...`);
        if (this.method === 'GET') {
            this.logger.value('No body for GET requests.');
            return null;
        }
        this.logger.log(`[5/5] Parsing Body...`);
        let body = parseDecorator('body', chunk);
        if (!body) {
            this.logger.colored('No body found.');
            return null;
        }
        body = JSON.parse(body);
        this.logger.json(body, true);
        return body;
    }

    parseDesc(chunk) {
        this.logger.log(`[1/5] Parsing description...`);
        let desc = parseDecorator('desc', chunk);
        this.logger.value(`${desc}`);
        return desc;
    }

    trimString(str) {
        return str.replace(/\s+/g, '');
    }

    toJson() {
        return {
            description: this.desc,
            method: this.method,
            url: this.url,
            headers: this.headers,
            body: this.body,
            response: this.response,
            error: this.error,
        };
    }

    toString() {
        return JSON.stringify(this.toJson());
    }
}

module.exports = Request;
