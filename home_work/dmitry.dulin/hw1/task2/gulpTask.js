
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const path = require('path')
const minify = require('./minify.js')
const config = require('./config')

module.exports = (directory, destination) => {
  fs.readFileAsync(path.join(__dirname, config.joycasino), 'utf8').then(data => {
    return fs.readdirAsync(directory)
      .map(file => fs.readFileAsync(path.join(directory, file), 'utf8'))
      .then(contents => {
        contents.push(data)
        return fs.writeFileAsync(destination, minify(contents.join('\n')))
      })
  })
}
