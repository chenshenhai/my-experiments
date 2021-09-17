const inquirer = require('inquirer');

async function ask(options) {
  
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

module.exports = (...args) => {
  return ask(...args).catch(err => {
    console.log(err);
    if (!process.env.VUE_CLI_TEST) {
      process.exit(1)
    }
  })
}