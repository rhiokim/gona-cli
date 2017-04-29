'use strict'

const db = require('../db')

module.exports = key => {
  db.instance.unset(`config.${key}`).write()
}
