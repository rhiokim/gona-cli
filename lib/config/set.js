'use strict'

const db = require('../db')

const booleanize = value => {
  switch (value) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return value
  }
}

module.exports = (key, value) => {
  db.instance.set(`config.${key}`, booleanize(value)).write()
}
