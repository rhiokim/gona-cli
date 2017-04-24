'use strict'
// const isBlank = require('is-blank')

const init = options => {
  const type = options.input.shift()

  switch (type) {
    case 'task':
      console.log('task')
      break
    case 'link':
      console.log('link')
      break
    default:
      console.log(options.help)
      break
  }
}

module.exports = init
