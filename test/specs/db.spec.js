const path = require('path')
const homeDir = require('home-dir')
const rimraf = require('rimraf')

const dir = path.join(homeDir(), '.haroo')

describe('Initialize Local DB', () => {
  let db, dbModule
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()
  const dbpath = path.join(dir, `${year}.json`)
  const dbModulePath = path.join(__dirname, '../..', 'lib', 'db')

  beforeEach(() => {
    rimraf.sync(dir)

    // http://stackoverflow.com/questions/15666144/how-to-remove-module-after-require-in-node-js
    delete require.cache[require.resolve(dbModulePath)]

    db = require(dbModulePath)
  })

  it('should be exist YYYY.json db file in $HOME/.haroo folder', () => {
    const fs = require('fs')
    const exist = fs.existsSync(dbpath)

    exist.should.be.true
  })

  it('should have empty Array named `tasks/MM/DD` pattern', () => {
    const instance = db.instance

    const tasks = instance.get(`tasks/${month}/${date}`).value()
    tasks.should.be.an.Object
  })

  it('should have default workspace item in tasks', () => {
    const instance = db.instance

    const tasks = instance.get(`tasks/${month}/${date}`).value()
    tasks.should.have.property('default')
    tasks.default.should.be.an.Array
  })
})
