'use strict'
const chalk = require('chalk')
const drivers = require('./drivers')

const Sync = cli => {
  const driver = cli.flags.driver

  if (driver) {
    drivers(driver)
    return
  }

  console.log(`Use ${chalk.yellow('todo --help')} to see usage`)
}

module.exports = Sync
