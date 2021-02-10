/**
 * 下载模板
 * create <template-name> <project-name>
 */
const { promisify } = require('util')
const ora = require('ora')
// const semver = require('semver');
// const os = require('os');
const clear = require('clear')
const inquirer = require('inquirer')
// const validateProjectName = require('validate-npm-package-name');
const { readFile } = require('../utils/fileSteam')
const { log } = require('../utils')
const exec = require('child_process').exec

const path = require('path')
const fs = require('fs')

async function create (projectName, options) {
  const templateName = selectTemplate()
  // 判断是否已经下载该模板 存在则保存
  const isExist = getTargetDir(projectName)
  isExist ? rmFile(templateName) : downloadFile(templateName)
}

async function selectTemplate () {
  let template = ''
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Check the template create your project:',
      choices: [
        {
          name: 'Vue3.0',
          value: 'Vue3.0'
        },
        {
          name: 'nuxt',
          value: 'nuxt'
        },
        {
          name: 'Vue2.0-mult',
          value: 'Vue2.0-mult'
        }
      ]
    }
  ])
  template = action
  return template
}

function getTargetDir (projectName) {
  const cwd = process.cwd()
  const targetDir = path.join(cwd, `./${projectName}`)
  process.env.DOWNLOAD_FILE_DIR = targetDir
  return fs.existsSync(targetDir)
}

async function rmFile (templateName) {
  clear()
  // 待创建目录已经存在
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: `Target directory ${log('cyan', process.env.DOWNLOAD_FILE_DIR)}
            already exists. Pick an action:`,
      choices: [
        { name: 'Overwrite', value: 'overwrite' },
        {
          name: 'Cancel',
          value: false
        }
      ]
    }
  ])
  if (action === 'overwrite') {
    console.log(`\nRemoving ${log('cyan', process.env.DOWNLOAD_FILE_DIR)}...`)
    await exec(`rm -rf ${process.env.DOWNLOAD_FILE_DIR}`)
    await downloadFile()
  }
}

async function downloadFile (templateName) {
  const repoDownLoad = await promisify(require('download-git-repo'))
  const config = readFile()
  const repo = config.template[templateName].downloadUrl
  const spinner = ora(`downloading...${repo}`)
  spinner.color = 'green'
  spinner.start()
  try {
    await repoDownLoad(repo, process.env.DOWNLOAD_FILE_DIR)
    spinner.succeed()
  } catch (error) {
    spinner.stop()
  }
}

module.exports = async (templateName, projectName, ...args) => {
  return create(templateName, projectName, ...args).catch((err) => {
    log('red', err)
    process.exit(1)
  })
}
