#!/usr/bin/env node
'use strict'
const meow = require('meow')
const debug = require('./state/debug')
// const inquirer = require('inquirer')
// const chalk = require('chalk')
const todo = require('.')

const cli = meow(
  {
    help: `
    Usage
      $ todo <command> <options>

    Type
      type is command type

    Options
      -v, --version     Version of TODO CLI

    Examples
      $ todo                        # Show all tasks
      $ todo task [task item]       # Add task
      $ todo task done 1            # Done task
  `
  },
  {
    alias: {
      a: 'add',
      d: 'delete',
      l: 'ls'
    },
    default: {
      dir: process.cwd()
    }
  }
)

if (cli.flags.debug) {
  debug('cli.flags', cli.flags)
  debug('cli.input', cli.input)
}

todo(cli)
