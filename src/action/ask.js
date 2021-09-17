const inquirer = require('inquirer');

module.exports = async function ask(options) {
  
  const { name, version } = await inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: `Please input name: `
    },
    {
      name: 'version',
      type: 'input',
      message:`Please input version: `
    }
  ])

  console.log('data =', { name, version });
}
