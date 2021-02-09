const chalk = require('chalk');
const isGitUrl = require('is-git-url');
const { log } = require('../utils');
const { readFile, writeFile } = require('../utils/fileSteam');

async function addProjectTemplate(templateName, gitRepoAddress) {
  const templateGitRepoJson = readFile();
  if (templateGitRepoJson[templateName]) {
    log('red', `template name ${templateName} has exists.`);
    return;
  }
  if (!isGitUrl(gitRepoAddress)) {
    log('red', `git repo address ${gitRepoAddress} is not a correct git repo.`);
  } else {
  }
  const correctGitRepo = getRealGitRepo(gitRepoAddress);
  templateGitRepoJson['template'][templateName] = {
    github: gitRepoAddress,
    download: correctGitRepo
  };
  writeFile(templateGitRepoJson, '../config/config.json');

  log('white');
  log(
    'white',
    `🎉  Successfully add project template ${chalk.yellow(templateName)}.`
  );
  log('white');
}

function getRealGitRepo(gitRepo) {
  const sshRegExp = /^git@github.com:(.+)\/(.+).git$/;
  const httpsRegExp = /^https:\/\/github.com\/(.+)\/(.+).git$/;
  if (sshRegExp.test(gitRepo)) {
    // ssh
    const match = gitRepo.match(sshRegExp);
    return `github:${match[1]}/${match[2]}`;
  }
  if (httpsRegExp.test(gitRepo)) {
    // https
    const match = gitRepo.match(httpsRegExp);
    return `github:${match[1]}/${match[2]}`;
  }
}

module.exports = (...args) => {
  return addProjectTemplate(...args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};
