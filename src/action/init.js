const inquirer = require('inquirer');

module.exports = async function init(targetDir, options) {

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
  ])


  console.log('data =', { name, template });
}
