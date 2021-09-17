const path = require('path');
const inquirer = require('inquirer');
const { readAllFilesPath, createFile } = require('./../util/file');
const fs = require('fs');

module.exports = async function init(targetDir, options) {
  const tplBaseDir = path.join(__dirname, '..', 'template');
  const { name, template } = await inquirer.prompt([
    {
      name: 'template',
      type: 'list',
      choices: ['demo1', 'demo2'],
      message: `Please select template: `
    },
    {
      name: 'name',
      type: 'input',
      default: 'helloworld',
      message: `Please input name: `
    },
  ]);

  const tplDir = path.join(tplBaseDir, template);
  const tplFiles = readAllFilesPath(tplDir);

  if (fs.existsSync(targetDir)) {
    console.error('Target dir is existed!');
    return;
  }

  tplFiles.forEach((item) => {
    const tplFilePath = path.join(tplDir, item);
    const text = fs.readFileSync(tplFilePath, { encoding: 'utf8' });
    const targetFilePath = path.join(targetDir, item);
    createFile(targetFilePath, text);
    console.log(`[INFO]: create ${item}`);
  });

  console.error('OK!');
}
