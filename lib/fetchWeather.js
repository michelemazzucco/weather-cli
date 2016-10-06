const https = require('https')
const printResults = require('./printResults')

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
        printResults(json)
      } catch (e) {
        console.error(e)
      }
    })
  })

  req.on('error', (e) => console.error(e))
}

module.exports = fetchWeather
