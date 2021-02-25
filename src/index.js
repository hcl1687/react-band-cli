#! /usr/bin/env node

var init = require('./commands/init')
const { program } = require('commander')

program
  .version('0.1.2', '-v, --version')
  .command('init <name>')
  .option('-t --template <name>', 'use plain javascript or typescript.')
  .option('-d --demo <name>', 'with demo')
  .option('-o --overwrite', 'overwrite exist directory')
  .description('initialize your project with react-band')
  .action(init);

program.parse(process.argv);