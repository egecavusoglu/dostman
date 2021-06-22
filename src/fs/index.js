const fs = require("fs");

const readFile = (filePath) => {
  return fs.readFileSync(filePath, "utf-8");
};

module.exports = {
  readFile,
};
