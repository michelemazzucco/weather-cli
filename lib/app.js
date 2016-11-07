const App = function(ip) {
  this.ip = ip
}

App.prototype.init = function() {
  console.log(this.ip)
}

module.exports = App
