#!/usr/bin/env node

const public_ip = require('public-ip')
const https = require('https')

//const argv = process.argv

//if (argv.length > 2)
//  console.log(argv.slice(2))

function find_ip() {
  let ip = ''
  public_ip.v4().then(your_ip => ip = your_ip)

  return ip
}

function geolocation(ip) {

  let opts = {
    host: 'freegeoip.net',
    path: '/json/' + ip,
    method: 'GET'
  }

  let pos = {}

  https.get(opts, (response) => {
    let body = ''
    response.on('data', function (c) {
      body += c;
    })
    response.on('end', function () {
      let json = JSON.parse(body)
      pos = {
        lat: json.latitude,
        long: json.longitude
      }

      console.log(pos)
    })
  })
  .on('error', (e) => console.log(e))
}

geolocation(find_ip())
