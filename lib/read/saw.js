'use strict'

const db = require('../db')

module.exports = idx => {
  db.doneLink(idx, true)
}
