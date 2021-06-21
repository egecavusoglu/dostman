class Chunk {
  constructor(chunk) {
    const { method, url, headers, body } = this.parseChunk(chunk);
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.body = body;
  }

  parseChunk(chunk) {
    chunk = chunk.replace(/(\r\n|\n|\r)/gm, " ");
    chunk = chunk.replace(/\s\s+/g, " ");
    chunk += "@";
    return {
      method: this.parseMethod(chunk),
      url: this.parseUrl(chunk),
      headers: this.parseHeaders(chunk),
      body: this.parseBody(chunk),
    };
  }

  parseMethod(chunk) {
    let method = chunk.match(/(@method)(.*?)(?=@)/g)[0].replace("@method ", "");
    method = this.trimString(method);
    return method;
  }

  parseUrl(chunk) {
    let url = chunk.match(/(@url)(.*?)(?=@)/g)[0].replace("@url ", "");
    url = this.trimString(url);
    return url;
  }

  parseHeaders(chunk) {
    let headers = chunk
      .match(/(@headers)(.*?)(?=@)/g)[0]
      .replace("@headers ", "");
    headers = headers.split(","); // Seperate into array with ","
    headers.forEach((h, ind) => (headers[ind] = this.trimString(h)));
    return headers;
  }

  parseBody(chunk) {
    let body = chunk.match(/(@body)(.*?)(?=@)/g)[0].replace("@body ", "");
    body = JSON.parse(body);
    return body;
  }

  trimString(str) {
    return str.replace(/\s+/g, "");
  }
}

module.exports = Chunk;
