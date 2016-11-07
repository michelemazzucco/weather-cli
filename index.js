#!/usr/bin/env node

const public_ip = require('public-ip')
const App = require('./lib/app')

let ip = ''
public_ip.v4().then(your_ip => ip = your_ip)

let a = new App(ip)
a.init()
