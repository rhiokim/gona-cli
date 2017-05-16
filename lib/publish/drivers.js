'use strict'

const Driver = driver => {
  switch (driver) {
    case 'icloud':
      break
    case 'gist':
      require('./gist').sync()
      break
    default:
      break
  }
}

module.exports = Driver
