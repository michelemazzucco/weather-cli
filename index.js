#!/usr/bin/env node

const public_ip = require('public-ip')
const fetchPosition = require('./lib/fetchPosition')

let ip = ''
public_ip.v4().then(your_ip => ip = your_ip)

fetchPosition(ip)
