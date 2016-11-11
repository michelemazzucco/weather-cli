const d = require('./fetchData')

const App = function(ip) {
  this.ip = ip
}

App.prototype.run = function() {
  //console.log('Your ip:', this.ip)
  d.fetchPosition(this.ip, d.fetchWeather)
}

module.exports = App
