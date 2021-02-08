#!/usr/bin/env node
/**
 * 设置命令行
 */

const program = require('commander')
const { lowercase } = require('../utils/utils.js')
// 基本信息
program
  .version(require('../package').version, '-v, --version') // 版本
  .usage('<command> [options]'); // 使用信息


program
.command('create <template-name> <project-name>')
.description('create project')
.action((templateName, projectName = '.', cmd) => {
    // 输入参数校验
    require('../lib/easy-create')(lowercase(templateName), projectName);
})

program.parse(process.argv)
