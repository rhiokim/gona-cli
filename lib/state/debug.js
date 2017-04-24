'use strict'
const chalk = require('chalk')

const debug = () => {
  console.log(chalk.green('[cli] debug'))
  console.log.apply(console, arguments)
  console.log(`${chalk.green('===============================')}`)
}

module.exports = debug
