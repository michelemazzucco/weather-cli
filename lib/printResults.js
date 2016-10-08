const chalk = require('chalk')

function convertDate(d) {
  const date = new Date(d * 1000);
  let opts = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return date.toLocaleDateString('en-US', opts);
}

function todayView(currently, hourly) {
  let view = ''
  let temp = Math.round(currently.temperature*2)/2
  let humidity = currently.humidity*100

  view += '\n'
  view += chalk.bold.cyan(convertDate(currently.time)) + '\n'
  view += hourly.summary + '\n'
  view += 'Current temp: ' + temp
  view += '° ~ Humidity: ' + humidity + '%\n'

  return view
}

function printResults(data) {
  let currently = data.currently
  let todayHourly = data.hourly
  console.log(todayView(currently, todayHourly))
  console.log(chalk.black('Powered by Dark Sky\n'))
}

module.exports = printResults
