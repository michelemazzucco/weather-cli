#!/usr/bin/env node

const public_ip = require('public-ip')
const https = require('https')

const argv = process.argv

//if (argv.length > 2)
//  console.log(argv.slice(2))

let ip = ''
public_ip.v4().then(your_ip => ip = your_ip)

function geolocation(ip) {

  let opts = {
    host: 'freegeoip.net',
    path: '/json/' + ip,
    method: 'GET'
  }

  const req = https.get(opts, (response) => {
    let body = ''
    response.on('data', function (c) {
      body += c;
    })
    response.on('end', function () {
      let json = JSON.parse(body)
      let position = [json.latitude, json.longitude]
      console.log(position)
    })
  })

  req.on('error', (e) => console.log(e))
}

geolocation(ip);
