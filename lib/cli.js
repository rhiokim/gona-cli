#!/usr/bin/env node
'use strict'
const meow = require('meow')
const debug = require('./state/debug')
const inquirer = require('inquirer')
const chalk = require('chalk')
const isBlank = require('is-blank')

const cli = meow({
  help: `
    Usage
      $ cli <type> <options>

    Type
      type is command type

    Options
      -v, --version     version of cli

    Examples
      $ cli             # Show all item
      $ cli add         # Add item
      $ cli remove -a   # Remove all item
  `},
  {
    alias: {
      u: 'update',
      i: 'ignore'
    },
    default: {
      dir: process.cwd()
    },
    boolean: [
      'update'
    ],
    string: [
      'ignore'
    ]
  }
)

const options = {
  cwd: cli.input[0] || cli.flags.dir,
  update: cli.flags.update,
  debug: cli.flags.debug,
  ignore: cli.flags.ignore
}

if (options.debug) {
  debug('cli.flags', cli.flags)
  debug('cli.input', cli.input)
}

const questions = [
  {
    type: 'input',
    name: 'question -1',
    message: `input your ${chalk.magenta('answer')} ?`
  },
  {
    type: 'rawlist',
    name: 'question 0',
    message: 'choose your answer',
    choices: [
      'choice A',
      'choice B',
      new inquirer.Separator(),
      'choice C'
    ]
  },
  {
    type: 'checkbox',
    name: 'question 1',
    message: 'choose your answer',
    choices: ['choice A', 'choice B', new inquirer.Separator(), 'choice C', 'choice D', 'choice E', 'choice F'],
    pageSize: 5
  }
]

if (isBlank(cli.input[0])) {
  console.log(cli.help)
  process.exit(1)
} else {
  inquirer.prompt(questions)
}
