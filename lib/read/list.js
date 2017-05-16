'use strict'

const chalk = require('chalk')
const moment = require('moment')
const db = require('../db')

const date = (timestamp, format) => {
  format = format || 'MMMM Do YYYY'
  return moment(timestamp).format(format)
}

module.exports = () => {
  const list = db.links()
  let url
  let review
  // let createAt
  let done = list.filter(link => link.done === true)

  console.log(
    '\nDate: %s - All: %s, Active: %s, Completed: %s\n',
    chalk.white.bold(date()),
    chalk.white.bold(list.length),
    chalk.white.bold(list.length - done.length),
    chalk.white.bold(done.length)
  )

  list.forEach((link, i) => {
    done = link.done ? chalk.gray('[✓]') : chalk.white.bold('[ ]')
    url = link.done ? chalk.gray(link.url) : chalk.blue.bold.underline(link.url)
    review = link.review ? `\n  > ${link.review}` : ''
    // createAt = chalk.gray(fromNow())
    console.log('- %s %s %s\n', `[${i}]`, url, review)
  })
}
