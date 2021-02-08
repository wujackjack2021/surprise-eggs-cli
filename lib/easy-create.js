

/**
 * 下载模板
 * create <template-name> <project-name>
 */
const { promisify } = require('util')
const ora = require('ora')
const chalk = require('chalk');

const os = require('os')
const clear = require('clear');
const program = require('commander');
const inquirer = require('inquirer');
// const validateProjectName = require('validate-npm-package-name');
const { readFile, writeFile } = require('../utils/fileSteam');
const exec = require('child_process').exec;

const path = require('path');
const fs = require('fs');

async function create(templateName, projectName, options) {

  // 是否有这个项目模板
  const config = readFile();
  if (!config['template'][templateName]) {
    console.log(`  ` + chalk.red(`不存在${templateName}的模板`));
    program.outputHelp();
    return;
  }

  // 判断是否已经下载该模板 存在则保存
  let isExist = getTargetDir(projectName)
  isExist ? rmFile(templateName) : downloadFile(templateName)
}

function getTargetDir(projectName){
    const cwd = process.cwd();
    console.log("cwd", cwd)
    const targetDir = path.join(cwd, `./${projectName}`)
    console.log("targetDir", targetDir)
    process.env.DOWNLOAD_FILE_DIR = targetDir
    return fs.existsSync(targetDir)
}

async function rmFile(templateName){
    const tmpdir = path.resolve(__dirname, `../template/${templateName}`);
    clear()
    // 待创建目录已经存在
    const { action } = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(tmpdir)}
            already exists. Pick an action:`,
            choices: [
                { name: 'Overwrite', value: 'overwrite' },
                {
                    name: 'Cancel',
                    value: false
                }
            ]
        }
    ]);
    if (!action) {
        return;
      } else if (action === 'overwrite') {
        console.log(`\nRemoving ${chalk.cyan(tmpdir)}...`);
        await exec(`rm -rf ${tmpdir}`);
        await downloadFile()
    }
}

async function downloadFile(templateName){
    let repoDownLoad = await promisify(require('download-git-repo'))
    const config = readFile();
    let repo = config['template'][templateName]['downloadUrl']
    const spinner = ora(`downloading...${repo}`)
    spinner.color = 'green';
    spinner.start()
    try {
        const clone = false
        await repoDownLoad(repo, process.env.DOWNLOAD_FILE_DIR)
        console.log("__dirname", __dirname)
        spinner.succeed()
    } catch (error) {
        spinner.stop()
    }

}

module.exports = async (templateName, projectName, ...args) => {
    return create(templateName, projectName, ...args).catch(err => {
      console.error(err);
      process.exit(1);
    });
  };
  