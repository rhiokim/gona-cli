'use strict'

const {table} = require('table')
const chalk = require('chalk')
const db = require('../db')

let config, data, output

data = []
data.push(['id', '✓', chalk.white('task'), 'date'])

config = {
  columnCount: 4,
  columns: {
    0: {
      alignment: 'left'
    },
    1: {
      alignment: 'right',
      wdith: 10
    },
    2: {
      alignment: 'left',
      minWidth: 100
    },
    3: {
      alignment: 'right',
      wdith: 10
    }
  }
}

const c = (style, txt) => {
  style = style || 'gray'
  return chalk[style](txt)
}

module.exports = () => {
  const list = db.list('tasks').value()
  let done = list.filter(task => task.done === true)

  list.forEach((task, i) => {
    task.done === true
      ? data.push([
        c('dim', i),
        chalk.white.bold('✓'),
        c('dim', task.subject),
        c('dim', task.createAt)
      ])
      : data.push([
        i,
        c('dim', '✓'),
        chalk.white.bold(task.subject),
        task.createAt
      ])
  })

  output = table(data, config)
  console.log(
    '\n All: %s, Active: %s, Completed: %s',
    chalk.white.bold(list.length),
    chalk.white.bold(list.length - done.length),
    chalk.white.bold(done.length)
  )
  console.log(output)
}
