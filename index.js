#!/usr/bin/env node

const https = require('https')
const public_ip = require('public-ip')

let ip = ''
public_ip.v4().then(your_ip => ip = your_ip)

function weather_here(lat, lon) {
  let pos = {
    lat: lat,
    long: lon
  }

  let opts = {
    host: 'api.darksky.net',
    path: '/forecast/70c6dd8674c3516c1ffbea96553afa08/' + pos.lat + ',' + pos.long + '?units=auto'
  }

  var req = https.get(opts, (res) => {
    let body = ''
    res.on('data', function (c) {
      body += c
    })
    res.on('end', function () {
      let json = JSON.parse(body)
      console.log(json)
    })
  })

  req.on('error', (e) => console.log(e))
}

function geolocation(ip) {

  let opts = {
    host: 'freegeoip.net',
    path: '/json/' + ip
  }

  var req = https.get(opts, (res) => {
    let body = ''
    res.on('data', function (c) {
      body += c
    })
    res.on('end', function () {
      let json = JSON.parse(body)
      weather_here(json.latitude, json.longitude)
    })
  })

  req.on('error', (e) => console.log(e))
}

geolocation(ip)
