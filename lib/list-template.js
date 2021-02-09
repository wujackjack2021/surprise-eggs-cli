const chalk = require('chalk');
const { readFile } = require('../utils/fileSteam');
const { log } = require('../utils');
async function listAllTemplate() {
  const templateGitRepoJson = readFile();
  for (let key in templateGitRepoJson['template']) {
    log(
      'white',
      `➡️  Template name ${chalk.yellow(key)},  Github address ${chalk.yellow(
        templateGitRepoJson['template'][key]['github']
      )}`
    );
  }
  if (!Object.keys(templateGitRepoJson).length) {
    log(`💔  No any template.`);
  }
}

module.exports = () => {
  return listAllTemplate().catch((err) => {
    console.error(err);
    process.exit(1);
  });
};
