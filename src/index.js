#! /usr/bin/env node

var fs = require('fs')
var path = require('path')
const { program } = require('commander')
const mkdirp = require('mkdirp')
const download = require('download-git-repo')
const rbRepo = 'hcl1687/react-band'
const currentDir = process.cwd()

program
  .usage('[options] <file ...>')
  .option('-i --init <name>', 'init project')
  .parse(process.argv);

if (program.init) {
  initProject(program.init)
}

// create project
function initProject(projectName) {
  const projectPath = path.resolve(currentDir, projectName)
  console.log(projectPath)
  if (fs.existsSync(projectPath)) {
    console.warn(projectName + ' already exists, please use another name.')
  } else {
    fs.mkdirSync(projectPath)
    download(rbRepo, projectPath, (err) => {
      console.log(err && err.message)
    })
  }
}