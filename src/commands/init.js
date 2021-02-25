var fs = require('fs')
var path = require('path')
var ncp = require('ncp')
const download = require('download-git-repo')
const rbRepo = 'hcl1687/react-band'
const currentDir = process.cwd()
const DEMOS = ['default', 'basic', 'basic_menu', 'basic_menu_antd', 'redux_menu_antd', 'as']

// create project
function initProject(projectName, { demo, overwrite, template }) {
  const isTypescript = template === 'typescript'
  demo = DEMOS.includes(demo) ? demo : 'basic'

  const info = `Create a folder named '${projectName}' and init project with the '${demo}' demo using ${isTypescript ? 'typescript' : 'plain javascript'}.`
  console.log(info)
  const projectPath = path.resolve(currentDir, projectName)
  console.log(projectPath)
  if (fs.existsSync(projectPath) && !overwrite) {
    console.warn(projectName + ' already exists, please use another name.')
    return
  }

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath)
  }

  var steps = demo ? 2 : 1
  var step = 1

  console.log(`${step++}/${steps} download react-band ...`)
  const branch = isTypescript ? '#release/typescript' : ''
  download(rbRepo + branch, projectPath, (err) => {
    if (err) {
      console.warn(err)
      return
    }

    if (demo) {
      console.log(`${step++}/${steps} copy demo ...`)
      const demoPath = path.resolve(projectPath, 'demo/' + demo)
      console.log(demoPath)
      if (!fs.existsSync(demoPath)) {
        console.warn(demo + ' not exists.')
        return
      }
      copyDemo(projectPath, demoPath)
    }

    console.log(`Done.`)
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
  initProject(name, cmdObj)
}

module.exports = init;
