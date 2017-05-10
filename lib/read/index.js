'use strict'
const chalk = require('chalk')

const actions = {
  add: require('./add'),
  saw: require('./saw'),
  remove: require('./remove')
}

const Link = cli => {
  let url, action

  if (cli.input.length === 1) {
    action = 'add'
    url = cli.input.shift()
  }

  action = actions[action]

  if (!action) {
    console.log(`Use ${chalk.yellow('todo5 --help')} to see usage`)
    return
  }

  action(url)
}

module.exports = Link
