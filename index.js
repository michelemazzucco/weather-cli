#!/usr/bin/env node

const https = require('https')
const public_ip = require('public-ip')
const chalk = require('chalk')

let ip = ''
public_ip.v4().then(your_ip => ip = your_ip)

function convert_date(d) {
  const date = new Date(d * 1000);
  let opts = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return date.toLocaleDateString('en-US', opts);
}

function print_results(today) {
  console.log(chalk.green(convert_date(today.time)))
  console.log(chalk.underline(today.temperature))
}

function weather_here(lat, lon) {
  let pos = {
    lat: lat,
    long: lon
  }

  let opts = {
    host: 'api.darksky.net',
    path: '/forecast/70c6dd8674c3516c1ffbea96553afa08/' + pos.lat + ',' + pos.long + '?units=auto'
  }

  const req = https.get(opts, (res) => {
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      try {
        let json = JSON.parse(body)
        print_results(json.currently)
      } catch (e) {
        console.error(e)
      }
    })
  })

  req.on('error', (e) => console.error(e))
}

function geolocation(ip) {

  let opts = {
    host: 'freegeoip.net',
    path: '/json/' + ip
  }

  const req = https.get(opts, (res) => {
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      try {
        let json = JSON.parse(body)
        weather_here(json.latitude, json.longitude)
      } catch (e) {
        console.error(e)
      }
    })
  })

  req.on('error', (e) => console.error(e))
}

geolocation(ip)
