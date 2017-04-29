'use strict'

const db = require('../db')

module.exports = () => {
  const config = db.instance.get('config').value()

  console.log(JSON.stringify(config, null, 2))
}
