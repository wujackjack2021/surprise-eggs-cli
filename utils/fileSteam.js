/**
 * 读写工具类
 */

const fs = require('fs');
const path = require('path');

exports.readFile = (p) => {
  let realPath = p ? p : '../config/config.json'
  let readPath = path.join(__dirname, realPath)
  return JSON.parse(
    fs.readFileSync(
      readPath,
      'utf8'
    )
  );
};

exports.writeFile = file => {
  let readPath = path.join(__dirname, file)
  return fs.writeFileSync(
    readPath
  );
};
