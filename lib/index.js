'use strict'
// const isBlank = require('is-blank')
const task = require('./task')
const link = require('./link')
const config = require('./config')
const sync = require('./sync')
const alarm = require('./alarm')

const init = options => {
  const type = options.input.shift()

  switch (type) {
    case 'task':
      task(options)
      break
    case 'link':
      link(options)
      break
    case 'config':
      config(options)
      break
    case 'alarm':
      alarm(options)
      break
    case 'sync':
      sync(options)
      break
    default:
      console.log(options.help)
      break
  }
}

module.exports = init
