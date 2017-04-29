'use strict'

const db = require('../db')

module.exports = key => {
  const config = db.instance.get(`config.${key}`).value()

  console.log(config)
}
