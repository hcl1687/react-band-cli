#! /usr/bin/env node

var fs = require('fs')
var path = require('path')
var ncp = require('ncp')
const { program } = require('commander')
const mkdirp = require('mkdirp')
const download = require('download-git-repo')
const rbRepo = 'hcl1687/react-band'
const currentDir = process.cwd()

program
  .usage('[options] <file ...>')
  .option('-i --init <name>', 'init project')
  .option('-d --demo <name>', 'with demo')
  .parse(process.argv);

if (program.init) {
  console.log()
  initProject(program.init, program.demo)
}

// create project
function initProject(projectName, demoName) {
  const projectPath = path.resolve(currentDir, projectName)
  console.log(projectPath)
  if (fs.existsSync(projectPath)) {
    console.warn(projectName + ' already exists, please use another name.')
  } else {
    fs.mkdirSync(projectPath)
    download(rbRepo, projectPath, (err) => {
      if (err) {
        console.warn(err)
        return
      }

      const demoPath = path.resolve(projectPath, 'demo/' + demoName)
      console.log(demoPath)
      if (!fs.existsSync(demoPath)) {
        console.warn(demoName + ' not exists.')
        return
      }
      copyDemo(projectPath, demoPath)
    })
  }
}

function copyDemo(dest, source) {
  ncp(source, dest, (err) => {
    if (err) {
      console.warn(err)
      return
    }
  })
}