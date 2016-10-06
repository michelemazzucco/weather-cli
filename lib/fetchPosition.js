const https = require('https')
const fetchWeather = require('./fetchWeather')

function fetchPosition(ip) {

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
        fetchWeather(json)
      } catch (e) {
        console.error(e)
      }
    })
  })

  req.on('error', (e) => console.error(e))
}

module.exports = fetchPosition;
