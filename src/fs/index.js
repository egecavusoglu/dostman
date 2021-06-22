const fs = require("fs");

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    // console.error(`No file found at ${filePath}.\n${err}`);
    console.error(`${err}`);
    return false;
  }
};

const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);
    return true;
  } catch (err) {
    console.error(`${err}`);
    return false;
  }
};

module.exports = {
  readFile,
  writeFile,
};
