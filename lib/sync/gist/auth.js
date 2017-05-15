'use strict'

const chalk = require('chalk')
const GithubApi = require('github')
const config = require('../../db').config('sync.gist')

const github = new GithubApi({
  // debug: true,
  protocol: 'https',
  host: 'api.github.com',
  pathPrefix: '',
  headers: {
    'user-agent': 'gona-cli'
  },
  Promise: require('bluebird'),
  followRedirects: false,
  timeout: 5000
})

try {
  github.authenticate({
    type: 'token',
    token: config.token
  })
} catch (e) {
  console.log(
    `It's need to set your gist configuration. \nUse ${chalk.yellow('todo --help')} to see usage`
  )
  process.exit(0)
}

module.exports = github
