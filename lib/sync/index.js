'use strict'
const chalk = require('chalk')
const driver = require('./driver')

const Sync = cli => {
  let action

  if (cli.flags.driver) {
    driver(cli.flags.driver)
    return
  }

  if (!action) {
    console.log(`Use ${chalk.yellow('todo --help')} to see usage`)
  }
}

module.exports = Sync
