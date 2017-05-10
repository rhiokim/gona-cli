'use strict'

const db = require('../db')

module.exports = (subject, time, repeat) => {
  db.alarmAt(subject, time, repeat)
}
