'use strict'

const db = require('../db')

module.exports = idx => {
  db.done('tasks', idx, true)
}
