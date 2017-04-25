const path = require('path')
const homeDir = require('home-dir')
const rimraf = require('rimraf')

const dir = path.join(homeDir(), '.haroo')
const TestString = '    ✓'

describe('Initialize Local DB', () => {
  let db
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()
  const dbpath = path.join(dir, `${year}.json`)

  beforeEach(() => {
    rimraf.sync(dbpath)
    db = require(path.join(__dirname, '../..', 'lib', 'db'))
  })

  it('should be exist YYYY.json db file in $HOME/.haroo folder', () => {
    const fs = require('fs')
    const exist = fs.existsSync(dbpath)

    exist.should.be.true
  })

  it('should have empty Array named `tasks/MM/DD` pattern', () => {
    const instance = db.instance

    const tasks = instance.get(`tasks/${month}/${date}`).value()
    tasks.should.be.an.Array
    tasks.length.should.equal(0)

    const links = instance.get(`links/${month}/${date}`).value()
    links.should.be.an.Array
    links.length.should.equal(0)
  })

  it('should have task items', () => {
    const instance = db.instance
    const taskSubject = `task#${Math.random()}`
    db.add('tasks', taskSubject);

    const tasks = instance.get(`tasks/${month}/${date}`).value()

    tasks.length.should.equal(1)
    tasks[0].subject.should.equal(taskSubject)
  })
})
