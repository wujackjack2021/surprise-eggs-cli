/**
 * 函数的工具类
 */

const chalk = require('chalk')
function lowercase (str) {
  return str.toLocaleLowerCase()
}

function validateArgsLen (argvLen, maxArgvLens) {
  if (argvLen > maxArgvLens) {
    console.log(
      chalk.yellow(
        '\n Info: You provided more than argument. the rest are ignored.'
      )
    )
  }
}

const log = (type, content) => {
  const msg = content || ''
  const logs = {
    green: () => console.log(' ' + chalk.green(msg)),
    cyan: () => console.log(chalk.cyan(msg)),
    yellow: () => console.log(' ' + chalk.yellow(msg)),
    red: () => console.log(' ' + chalk.red(msg)),
    white: () => console.log(' ' + msg)
  }
  return logs[type]()
}

module.exports = {
  lowercase,
  validateArgsLen,
  log
}
