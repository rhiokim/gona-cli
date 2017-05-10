'use strict'

const db = require('../db')

module.exports = url => {
  db.addLink(url)
}
