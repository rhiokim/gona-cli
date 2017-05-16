'use strict'
// const isBlank = require('is-blank')
const task = require('./task')
const read = require('./read')
const config = require('./config')
const publish = require('./publish')

const init = options => {
  const type = options.input.shift()

  switch (type) {
    case 'do':
    case 'task':
      task(options)
      break
    case 'read':
      read(options)
      break
    case 'config':
      config(options)
      break
    case 'publish':
      publish(options)
      break
    default:
      console.log(options.help)
      break
  }
}

module.exports = init
