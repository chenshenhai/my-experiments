const program = require('commander');
const pkg = require('./../package.json');


program.version(pkg.version, '-v, --version');

program.command('ask').action((value, options) => {
  require('../src/ask')(options)
})

program.parse(process.argv);
