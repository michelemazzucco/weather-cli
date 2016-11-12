const chalk = require('chalk')

function convertDate(d, shortFormat) {
  const date = new Date(d * 1000)
  let opts = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  if(shortFormat === true) {
    opts = {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric'
    }
  }

  return date.toLocaleDateString('en-US', opts)
}

function convertTemp(temp) {
  return Math.round(temp*2)/2
}

function decToPercent(n) {
  return Math.round(n * 100)
}

const Printer = function(currently, hourly, days, position) {
  this.currently = currently
  this.hourly = hourly
  this.days = days
  this.region_name = position.region_name
  this.country_name = position.country_name
}

Printer.prototype.run = function() {
  console.log(this.region_name, this.country_name)
  console.log(this.todayView(this.currently, this.hourly))
  console.log(this.nextDaysView(this.days))
  console.log(chalk.black('Powered by Dark Sky\n'))
}

Printer.prototype.todayView = function(currently, hourly) {
  let view = ''

  view += '\n'
  view += chalk.bold.cyan(convertDate(currently.time)) + '\n'
  view += hourly.summary + '\n'
  view += 'Current temp: ' + convertTemp(currently.temperature)
  view += '° ~ Humidity: ' + decToPercent(currently.humidity) + '%'

  return view
}

Printer.prototype.nextDaysView = function(days) {
  let view = ''

  days.map((day) => {
    //console.log(day)
    let max = convertTemp(day.temperatureMax)
    let min = convertTemp(day.temperatureMin)

    view += chalk.black('____________________________________________________________')
    view += '\n'
    if (max >= 15 && min >= 5) {
      view += chalk.red('▸ ')
    } else {
      view += chalk.cyan('▸ ')
    }
    view += convertDate(day.time, true) + ' ~ '
    view += 'Min: ' + min + ' • '
    view += 'Max: ' + max + ' ~ '
    view += 'Precip: ' + decToPercent(day.precipProbability) + '%\n'
  })

  return view
}

module.exports = Printer
