'use strict'

const db = require('../db')

module.exports = taskIdx => {
  db.done('tasks', taskIdx)
}
