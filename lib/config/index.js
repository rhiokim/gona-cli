'use strict'
const chalk = require('chalk')

const actions = {
  all: require('./all'),
  get: require('./get'),
  set: require('./set'),
  unset: require('./unset')
}

const showHelp = () => {
  console.log(`Use ${chalk.yellow('todo --help')} to see usage`)
}

const Config = cli => {
  let key, value

  if (cli.input.length === 2) {
    key = cli.input.shift()
    value = cli.input.shift()
    actions.set(key, value)
    return
  }

  if (cli.flags.get) {
    actions.get(cli.flags.get)
    return
  }

  if (cli.flags.unset) {
    actions.unset(cli.flags.unset)
    return
  }

  if (cli.input.length === 0) {
    actions.all()
    return
  }

  showHelp()
}

module.exports = Config
