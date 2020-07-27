var fs = require('fs')
var path = require('path')
var ncp = require('ncp')
const download = require('download-git-repo')
const rbRepo = 'hcl1687/react-band'
const currentDir = process.cwd()

// create project
function initProject(projectName, demoName, overwrite) {
  const projectPath = path.resolve(currentDir, projectName)
  console.log(projectPath)
  if (fs.existsSync(projectPath) && !overwrite) {
    console.warn(projectName + ' already exists, please use another name.')
    return
  }

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath)
  }

  var steps = demoName ? 3 : 2
  var step = 1

  console.log(`${step++}/${steps} download react-band ...`)
  download(rbRepo, projectPath, (err) => {
    if (err) {
      console.warn(err)
      return
    }

    if (demoName) {
      console.log(`${step++}/${steps} copy demo ...`)
      const demoPath = path.resolve(projectPath, 'demo/' + demoName)
      console.log(demoPath)
      if (!fs.existsSync(demoPath)) {
        console.warn(demoName + ' not exists.')
        return
      }
      copyDemo(projectPath, demoPath)
    }

    console.log(`${step++}/${steps} Done.`)
  })
}

function copyDemo(dest, source) {
  ncp(source, dest, (err) => {
    if (err) {
      console.warn(err)
      return
    }
  })
}

function init(name, cmdObj) {
  initProject(name, cmdObj.demo, cmdObj.overwrite)
}

module.exports = init;
