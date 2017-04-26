'use strict'

const db = require('../db')

module.exports = taskIdx => {
  console.log('task done:', taskIdx)
  db.done('tasks', taskIdx)
}
