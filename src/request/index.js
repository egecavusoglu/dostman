class Request {
  constructor(chunk) {
    const { method, url, headers, body } = this.parseChunk(chunk);
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.body = body;
  }

  parseChunk(chunk) {
    chunk = chunk.replace(/(\r\n|\n|\r)/gm, " "); // Remove all line breaks
    chunk = chunk.replace(/\s\s+/g, " "); // Trim all whitespace to 1 space.
    chunk += "@"; // Add @ at the end for regex to work correctly.
    return {
      method: this.parseMethod(chunk),
      url: this.parseUrl(chunk),
      headers: this.parseHeaders(chunk),
      body: this.parseBody(chunk),
    };
  }

  parseMethod(chunk) {
    let method = this.parseDecorator("method", chunk);
    method = this.trimString(method);
    return method;
  }

  parseUrl(chunk) {
    let url = this.parseDecorator("url", chunk);
    url = this.trimString(url);
    return url;
  }

  parseHeaders(chunk) {
    let headers = this.parseDecorator("headers", chunk);
    headers = headers.split(","); // Seperate into array with ","
    headers.forEach((h, ind) => (headers[ind] = this.trimString(h)));
    return headers;
  }

  parseBody(chunk) {
    let body = this.parseDecorator("body", chunk);
    body = JSON.parse(body);
    return body;
  }

  trimString(str) {
    return str.replace(/\s+/g, "");
  }

  parseDecorator(decorator, chunk) {
    const regex = new RegExp(`(@${decorator})(.*?)(?=@)`);
    return chunk.match(regex)[0].replace(`@${decorator} `, "");
  }

  toJson() {
    return {
      method: this.method,
      url: this.url,
      headers: this.headers,
      body: this.body,
    };
  }

  toString() {
    return JSON.stringify(this.toJson());
  }
}

module.exports = Request;
