#!/usr/bin/env node
/**
 * 设置命令行
 */

const program = require('commander');
const { lowercase } = require('../utils');
// 基本信息
program
  .version(require('../package').version, '-v, --version') // 版本
  .usage('<command> [options]'); // 使用信息

// 创建模板
program
  .command('create <project-name>')
  .description('create project')
  .action((projectName = '.', cmd) => {
    require('../lib/create-template')(projectName);
  });

// 添加一个项目模板
program
  .command('add <template-name> <git-repo-address>')
  .description('add a project template')
  .action((templateName, gitRepoAddress, cmd) => {
    console.log(111);
    require('../lib/add-template')(lowercase(templateName), gitRepoAddress);
  });

// 列出支持的项目模板
program
  .command('list')
  .description('list all available project template')
  .action((cmd) => {
    require('../lib/list-template')();
  });

// 删除一个项目模板
program
  .command('delete <template-name>')
  .description('delete a project template')
  .action((templateName, cmd) => {
    require('../lib/delete-template')(templateName);
  });
program.parse(process.argv);
