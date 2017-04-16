#!/usr/bin/env node
'use strict'
const meow = require('meow')
const debug = require('./state/debug')

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
