import path from 'path';
import process from 'process';
import { Command } from 'commander';
import pkg from './../../package.json';

const program = new Command();

program.version(pkg.version, '-v, --version');

program.command('abc').action((value, options) => {
  console.log('abc')
})

program.command('init [projectDir]').action((value, options) => {
  if (!value) {
    console.warn('Please input [projectDir]');
    return;
  }
  const targetDir = path.join(process.cwd(), value);
  console.log('projectDir =', targetDir)
})

program.parse(process.argv);