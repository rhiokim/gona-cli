'use strict'
const chalk = require('chalk')

const actions = {
  list: require('./list'),
  at: require('./at')
}

const Alarm = cli => {
  let action, time
  let subject = ''
  let repeat = false

  if (cli.input.length === 0) {
    action = 'list'
  }
  if (cli.input.length === 2) {
    action = cli.input.shift()
    time = cli.input.shift()
  }
  if (cli.input.length === 3) {
    action = cli.input.shift()
    time = cli.input.shift()
    subject = cli.input.shift()
  }

  repeat = !!cli.flags.repeat

  action = actions[action]

  if (!action) {
    console.log(`Use ${chalk.yellow('todo5 --help')} to see usage`)
    return
  }

  action(subject, time, repeat)
}

module.exports = Alarm
