/**
 * 函数的工具类
 */

const chalk = require('chalk')
function lowercase(str) {
  return str.toLocaleLowerCase();
}

function validateArgsLen(argvLen, maxArgvLens) {
  if (argvLen > maxArgvLens) {
    console.log(
      chalk.yellow(
        '\n Info: You provided more than argument. the rest are ignored.'
      )
    );
  }
}
module.exports = {
    lowercase,
    validateArgsLen
}