'use strict'

const path = require('path')
const homeDir = require('home-dir')
const low = require('lowdb')
const mkdirp = require('mkdirp')

const dir = path.join(homeDir(), '.haroo')

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const date = new Date().getDate()

const posfix = `${month}/${date}`
const getKey = part => `${part}/${posfix}`

mkdirp.sync(dir)

const db = low(path.join(dir, `${year}.json`))

if (!db.has(getKey('tasks')).value()) {
  db.set(getKey('tasks'), []).set(getKey('links'), []).write()
}

const today = part => db.get(`${part}/${posfix}`)

module.exports = {
  instance: db,
  add: (part, subject) => {
    today(part)
      .push({
        subject: subject,
        createAt: new Date().getTime()
      })
      .write()
  },
  done: (part, subject) => {
    const task = today(part).nth(subject).value()
    task.done = true
    db.write()
  },
  list: part => {
    return today(part)
  }
}
