'use strict'

const path = require('path')
const homeDir = require('home-dir')
const low = require('lowdb')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const uuid = require('uuid/v1')

let db
let dir = path.join(homeDir(), '.haroo')

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const date = new Date().getDate()

const posfix = `${month}/${date}`
const getKey = part => `${part}/${posfix}`

// mkdirp.sync(dir)

// let db = low(path.join(dir, `${year}.json`))

// if (!db.has(getKey('tasks')).value()) {
//   db.set(getKey('tasks'), []).set(getKey('links'), []).write()
// }

const today = (part, workspaces = 'default') =>
  db.get(`${part}/${posfix}.${workspaces}`)

const item = (part, idx) => today(part).nth(idx).value()

const destroy = () => {
  rimraf.sync(dir)
}

const create = () => {
  mkdirp.sync(dir)
  db = low(path.join(dir, `${year}.json`))
  db
    .defaults({
      config: {},
      alarms: []
    })
    .write()

  if (!db.has(getKey('tasks')).value()) {
    db
      .set(getKey('tasks'), {
        default: []
      })
      .set(getKey('links'), [])
      .write()
  }
}

create()

module.exports = {
  instance: db,
  create: create,
  destroy: destroy,
  add: (part, subject) => {
    today(part)
      .push({
        id: uuid(),
        subject: subject,
        priority: 2,
        done: false,
        createAt: new Date().getTime()
      })
      .write()
  },
  done: (part, subject, done) => {
    const task = item(part, subject)
    task.done = done
    db.write()
  },
  list: part => {
    return today(part)
  },
  alarms: () => {
    return db.get('alarms')
  },
  alarmAt: (subject, time, repeat) => {
    const alarms = db.get('alarms')
    alarms
      .push({
        id: uuid(),
        subject: subject,
        done: false,
        at: time,
        repeat: repeat,
        createAt: new Date().getTime()
      })
      .write()
  }
}
