const inquirer = require('inquirer');

module.exports = async function init(targetDir, options) {

  const { name, version } = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: `Please input name: `
    },
  ])
  console.log('data =', { name, version });
}
