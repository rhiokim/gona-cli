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

const tasks = (part, workspaces = 'default') =>
  db.get(`${part}/${posfix}.${workspaces}`)

const links = part => db.get(`links/${posfix}`)

const item = (part, idx) => tasks(part).nth(idx).value()

const destroy = () => {
  rimraf.sync(dir)
}

const create = () => {
  mkdirp.sync(dir)
  db = low(path.join(dir, `${year}.json`))
  db
    .defaults({
      config: {}
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
    tasks(part)
      .push({
        id: uuid(),
        subject: subject,
        priority: 2,
        done: false,
        createAt: new Date().getTime()
      })
      .write()
  },
  addLink: subject => {
    links()
      .push({
        id: uuid(),
        url: subject,
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
    return tasks(part)
  },
  config: key => {
    key = key ? `config.${key}` : 'config'

    return db.get(key).value()
  }
}
