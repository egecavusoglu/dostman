const axios = require('axios');
const { parseDecorator } = require('../lib/parsers');
class Request {
    method;
    url;
    headers;
    body;
    desc;
    response;
    error;

    constructor(chunk) {
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
            return true;
        } catch (err) {
            const { status, message } = err?.response;
            this.error = {
                status,
                message,
            };
            // console.error(err);
            return false;
        }
    }

    parseChunk(chunk) {
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
        let method = parseDecorator('method', chunk);
        method = this.trimString(method);
        return method;
    }

    parseUrl(chunk) {
        let url = parseDecorator('url', chunk);
        url = this.trimString(url);
        return url;
    }

    parseHeaders(chunk) {
        let headers = parseDecorator('headers', chunk);
        headers = headers.split(','); // Seperate into array with ","
        const headersObject = {};
        headers.forEach((h, ind) => {
            const item = headers[ind].split(':');
            const key = item[0].trim();
            const value = item[1].trim();
            headersObject[key] = value;
        });
        return headersObject;
    }

    parseBody(chunk) {
        let body = parseDecorator('body', chunk);
        body = JSON.parse(body);
        return body;
    }

    parseDesc(chunk) {
        let desc = parseDecorator('desc', chunk);

        return desc;
    }

    trimString(str) {
        return str.replace(/\s+/g, '');
    }

    toJson() {
        return {
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
