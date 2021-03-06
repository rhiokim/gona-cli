'use strict'

const {table} = require('table')
const chalk = require('chalk')
const moment = require('moment')
const db = require('../db')

let config, data, output

const c = (style, txt) => {
  style = style || 'gray'
  return chalk[style](txt)
}

const date = (timestamp, format) => {
  format = format || 'MMMM Do YYYY'
  return moment(timestamp).format(format)
}

const fromNow = timestamp => {
  return moment(timestamp).fromNow()
}

const getPriority = p => {
  switch (p) {
    case 3:
      return chalk.bgRed.white.bold('  high  ')
    case 1:
      return chalk.bgWhite.black('  low   ')
    default:
      return chalk.bgGreen.white.bold(' normal ')
  }
}

data = []
data.push(['id', '[✓]', chalk.white('task'), 'priority', 'create at'])

config = {
  columnCount: 5,
  columns: {
    0: {
      alignment: 'left'
    },
    1: {
      alignment: 'left',
      wdith: 10
    },
    2: {
      alignment: 'left',
      minWidth: 100
    },
    3: {
      wdith: 10,
      alignment: 'center'
    },
    4: {
      alignment: 'right',
      wdith: 10
    }
  }
}

module.exports = () => {
  const list = db.list('tasks').value()
  let done = list.filter(task => task.done === true)

  list.forEach((task, i) => {
    task.done === true
      ? data.push([
        c('dim', i),
        '[✓]',
        c('dim', task.subject),
        getPriority(task.priority),
        c('dim', fromNow(task.createAt))
      ])
      : data.push([
        i,
        '[ ]',
        chalk.white.bold(task.subject),
        getPriority(task.priority),
        fromNow(task.createAt)
      ])
  })

  output = table(data, config)
  console.log(
    '\nDate: %s - All: %s, Active: %s, Completed: %s',
    chalk.white.bold(date()),
    chalk.white.bold(list.length),
    chalk.white.bold(list.length - done.length),
    chalk.white.bold(done.length)
  )
  console.log(output)
}
