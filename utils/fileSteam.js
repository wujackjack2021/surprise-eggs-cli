/**
 * 读写工具类
 */

const fs = require('fs')
const path = require('path')

exports.readFile = (p) => {
  const realPath = p || '../config/config.json'
  const readPath = path.join(__dirname, realPath)
  return JSON.parse(fs.readFileSync(readPath, 'utf8'))
}

exports.writeFile = (data, filePath) => {
  const readPath = path.join(__dirname, filePath)
  return fs.writeFileSync(readPath, JSON.stringify(data))
}
