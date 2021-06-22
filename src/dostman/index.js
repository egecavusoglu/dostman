const { readFile } = require("../utils");
const { parseDecorator } = require("../utils");
const Request = require("../request");

class Dostman {
  // Member variables
  filePath;
  file;
  config;
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
      throw new Error("Unable to read file.");
    }

    return this.cleanFile(file);
  }

  cleanFile(file) {
    file = file.replace(/(\r\n|\n|\r)/gm, " "); // Remove all line breaks
    file = file.replace(/\s\s+/g, " "); // Trim all whitespace to 1 space.
    return file;
  }

  parseFile() {
    const chunks = this.getChunks();
    chunks.forEach((c) => {
      if (this.isConfigChunk(c)) {
        this.config = this.parseConfig(c);
        return;
      }
      const req = this.parseRequest(c);
      if (req) this.requests.push(req);
    });
  }

  isConfigChunk(chunk) {
    return chunk.includes("@config");
  }

  getChunks() {
    return this.file.split("###");
  }

  parseConfig(chunk) {
    const config = parseDecorator("config", chunk);
    return config;
  }

  parseRequest(chunk) {
    try {
      const request = new Request(chunk);
      return request;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = Dostman;
