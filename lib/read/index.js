'use strict'
const chalk = require('chalk')

const actions = {
  list: require('./list'),
  add: require('./add'),
  saw: require('./saw'),
  done: require('./saw'),
  remove: require('./remove')
}

const Link = cli => {
  let action, subject

  if (cli.input.length === 0) {
    action = 'list'
  }
  if (cli.input.length === 1) {
    action = 'add'
    subject = cli.input.shift()
  }
  if (cli.input.length >= 2) {
    action = cli.input.shift()
    subject = cli.input.shift()
  }

  action = actions[action]

  if (!action) {
    console.log(`Use ${chalk.yellow('todo5 --help')} to see usage`)
    return
  }

  action(subject)
}

module.exports = Link
