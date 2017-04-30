const path = require('path')
const homeDir = require('home-dir')
const rimraf = require('rimraf')

describe('Task', () => {
  let db, dbModule, task
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()

  const dir = path.join(homeDir(), '.haroo')
  const dbpath = path.join(dir, `${year}.json`)
  const dbModulePath = path.join(__dirname, '../..', 'lib', 'db')
  const cliModulePath = path.join(__dirname, '../..', 'lib')

  beforeEach(() => {
    // rimraf.sync(dir)
    db = require(dbModulePath)
    db.destroy()
    db.create()
    // require.cache = {}
    // http://stackoverflow.com/questions/15666144/how-to-remove-module-after-require-in-node-js
    // delete require.cache[require.resolve(dbModulePath)]
    // delete require.cache[require.resolve(cliModulePath)]

    // db = require(dbModulePath)
    cli = require(cliModulePath)

    // db = require(dbpath)
  })

  it('should have properties', () => {
    let tasks

    cli({
      input: ['task', 'add', `task#${Math.random()}`]
    })

    tasks = db.list('tasks').value()

    tasks.length.should.equal(1)
    tasks[0].should.have.property('subject')
    tasks[0].should.have.property('priority')
    tasks[0].should.have.property('createAt')
  })

  it('should have two tasks', () => {
    let tasks

    cli({
      input: ['task', 'add', `task#${Math.random()}`]
    })
    cli({
      input: ['task', 'add', `task#${Math.random()}`]
    })

    tasks = db.list('tasks').value()
    tasks.length.should.equal(2)
  })

  it('should be done', () => {
    let tasks

    cli({
      input: ['task', 'add', `task#${Math.random()}`]
    })

    tasks = db.list('tasks').value()
    tasks[0].done.should.be.false

    cli({
      input: ['task', 'done', '0']
    })

    tasks = db.list('tasks').value()
    tasks[0].done.should.be.true
  })

})
