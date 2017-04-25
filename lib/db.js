'use strict'

const path = require('path')
const homeDir = require('home-dir')
const low = require('lowdb')
const mkdirp = require('mkdirp')

const dir = path.join(homeDir(), '.haroo')

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const date = new Date().getDate()
const db = low(path.join(dir, `${year}.json`))

const posfix = `${month}/${date}`
const key = `tasks/${posfix}`

mkdirp.sync(dir)

if (!db.has(key).value()) {
  db.set(key, []).set(`links/${posfix}`, []).write()
}

const today = part => db.get(`${part}/${posfix}`)

module.exports = {
  add: (part, subject) => {
    today(part)
      .push({
        subject: subject,
        createAt: new Date().getTime()
      })
      .write()
  }
}
