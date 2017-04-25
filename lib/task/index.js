'use strict'
const chalk = require('chalk')

const actions = {
  add: require('./add'),
  done: require('./done'),
  remove: require('./remove')
}

const Task = cli => {
  let subject, action

  if (cli.input.length === 1) {
    action = 'add'
    subject = cli.input.shift()
  }

  action = actions[action]

  if (!action) {
    console.log(`Use ${chalk.yellow('todo5 --help')} to see usage`)
    return
  }

  action(subject)
}

module.exports = Task
