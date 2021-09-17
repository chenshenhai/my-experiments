const path = require('path');
const inquirer = require('inquirer');

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

  console.log('tplBaseDir ===', tplBaseDir);


  console.log('data =', { name, template });
}
