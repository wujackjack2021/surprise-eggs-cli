const chalk = require('chalk')
const inquirer = require('inquirer')
const { log } = require('../utils')
const { readFile, writeFile } = require('../utils/fileSteam')
async function deleteTemplate (templateName) {
  const templateGitRepoJson = readFile()
  if (!templateGitRepoJson.template[templateName]) {
    console.log(
      '  ' + chalk.red(`template name ${templateName} has not exists.`)
    )
    return
  }
  const { ok } = await inquirer.prompt([
    {
      name: 'ok',
      type: 'confirm',
      message: `Make sure you want to delete template name ${templateName}?`
    }
  ])
  if (!ok) {
    return
  }
  delete templateGitRepoJson.template[templateName]
  writeFile(templateGitRepoJson, '../config/config.json')

  log(
    'white',
    `🎉  Successfully delete project template ${chalk.yellow(templateName)}.`
  )
}

module.exports = (...args) => {
  return deleteTemplate(...args).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
