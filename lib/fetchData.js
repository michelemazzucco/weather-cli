const https = require('https')
const Printer = require('./printer')

function fetchPosition(ip, callback) {

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
        callback(json)
      } catch (e) {
        console.error(e)
      }
    })
  })

  req.on('error', (e) => console.error(e))
}

function fetchWeather(position) {

  let opts = {
    host: 'api.darksky.net',
    path: '/forecast/70c6dd8674c3516c1ffbea96553afa08/' + position.latitude + ',' + position.longitude + '?units=auto'
  }

  const req = https.get(opts, (res) => {
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      try {
        let json = JSON.parse(body)
        let p = new Printer(json.currently, json.hourly, json.daily.data, position)
        p.run()
      } catch (e) {
        console.error(e)
      }
    })
  })

  req.on('error', (e) => console.error(e))
}

module.exports = {
  fetchPosition: fetchPosition,
  fetchWeather: fetchWeather
}
