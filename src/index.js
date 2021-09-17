const path = require('path');
const process = require('process');
const program = require('commander');
const pkg = require('./../package.json');

program.version(pkg.version, '-v, --version');

program.command('ask').action((value, options) => {
  require('./action/ask')(options)
})

program.command('init [projectDir]').action((value, options) => {
  if (!value) {
    console.warn('Please input [projectDir]');
    return;
  }
  const targetDir = path.join(process.cwd(), value);
  require('./action/init')(targetDir, options)
})

program.parse(process.argv);
