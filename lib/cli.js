#!/usr/bin/env node
'use strict'
const meow = require('meow')
const updateNotifier = require('update-notifier')
const debug = require('./state/debug')
// const inquirer = require('inquirer')
const chalk = require('chalk')
const todo = require('.')

const cli = meow(
  {
    help: `
    Usage
      $ gona <command> <options>

    Type
      type is command type

    Options
      -v, --version     Version of TODO CLI

    Configuration
      $ gona config user.name "username"      # Set config
      $ gona config --get user.name           # Get config
      $ gona config --unset user.name         # Unset config

      sync.driver = icloud | dropbox | gist   #

    Examples
      $ gona                          # Show all tasks
      $ gona do [task item]           # Add task
      $ gona do done 1                # Done task

    If you have any problems, do not hesitate to file an issue:
    ${chalk.blue.underline('https://github.com/rhiokim/gona/issues/new')}
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

updateNotifier({pkg: cli.pkg}).notify()

if (cli.flags.debug) {
  debug('cli.flags', cli.flags)
  debug('cli.input', cli.input)
}

todo(cli)
