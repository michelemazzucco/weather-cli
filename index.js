#!/usr/bin/env node
const public_ip = require('public-ip')
const chalk = require('chalk')
const App = require('./lib/app')

//public_ip.v4()
//  .then((res) => {
//    let ip = '188.218.142.123'
//
//    let a = new App(ip)
//    a.run()
//  })
//  .catch((e) => console.log(chalk.red('✗ ' + e.message))
//)

let ip = '188.218.142.123'

let a = new App(ip)
a.run()
