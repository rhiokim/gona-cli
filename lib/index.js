'use strict'
// const isBlank = require('is-blank')
const task = require('./task')
const link = require('./link')

const init = options => {
  const type = options.input.shift()

  switch (type) {
    case 'task':
      task(options)
      break
    case 'link':
      link(options)
      break
    default:
      console.log(options.help)
      break
  }
}

module.exports = init
