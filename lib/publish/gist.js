'use strict'

const chalk = require('chalk')
const moment = require('moment')
const ora = require('ora')

const db = require('../db')
const config = db.config('sync.gist')

if (!config) {
  console.log(
    `It's need to set your gist configuration. \nUse ${chalk.yellow('todo --help')} to see usage`
  )
  process.exit(0)
}

const github = require('./gist/auth')

const arrayToMarkdown = (arr = []) => {
  const res = []
  arr.map(task => {
    let done = task.done ? 'x' : ' '
    res.push(`- [${done}] ${task.subject}`)
  })

  return res.join('\n')
}

const merge = (files, file, content) => {
  const res = {
    files: {}
  }

  for (let name in files) {
    res.files[name] = {
      content: files[name].content
    }
  }

  res.files[file] = {
    content: content
  }

  return res
}

module.exports = {
  sync: () => {
    const tasks = db.list('tasks').value()
    const content = arrayToMarkdown(tasks)
    const file = `${moment().format('YYYY-MM-DD')}.md`
    const spinner = ora('Synchronizing...').start()

    github.gists
      .get({
        id: config.id
      })
      .then(gist => {
        const res = merge(gist.data.files, file, content)
        const d = moment()

        github.gists
          .edit({
            id: config.id,
            files: res.files,
            description: `Update TODO list - latest updated at ${d.format('MMMM Do, hh:mm:ss')}`
          })
          .then(res => {
            spinner.succeed(
              'Synchronized: ' +
                chalk.blue.bold.underline(
                  `https://gist.github.com/${config.id}`
                )
            )
          })
      })
  }
}
