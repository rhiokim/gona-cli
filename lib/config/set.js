'use strict'

const db = require('../db')

module.exports = (key, value) => {
  db.instance.set(`config.${key}`, value).write()
}
