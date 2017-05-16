'use strict'
const chalk = require('chalk')
const drivers = require('./drivers')

const Sync = cli => {
  const driver = cli.flags.driver

  if (driver) {
    drivers(driver)
    return
  }

  console.log(
    `
Publish task list to Gist Repository

Usage: gona publish --driver <service>

  service can be:
    gist ${chalk.gray('| evernote | icloud | dropbox')}

Options:
  --driver, -d gist${chalk.gray('|evernote|icloud|dropbox')}
  Publish task list to services such as Git, Note and Cloud

Examples:
  $ gona publish --driver gist
  `
  )
}

module.exports = Sync
