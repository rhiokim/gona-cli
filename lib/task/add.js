'use strict'

const db = require('../db')

module.exports = subject => {
  db.add('tasks', subject)
}
