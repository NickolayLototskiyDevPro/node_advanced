const express = require('express')
const mongoose = require('mongoose')
/*eslint-disable */
const domain = require('domain')
/*eslint-enable */

const app = express()

const domain1 = domain.create()
const domain2 = domain.create()

const PORT = process.env.PORT || 8080

domain1.on('error', err => {
  console.error(err)
})

domain2.on('error', err => {
  console.error(err)
})

mongoose.connection.on('error', err => {
  console.error(err)
})

domain1.run(() => {
  mongoose.connect('mongodb://test:test@ds161295.mlab.com:61295/dulin-domain')
})

app.get('/home', (req, res) => {
  res.send('This is home page.')
})

app.get('/error', (req, res) => {
  throw new Error('Error')
})

domain2.run(() => {
  app.listen(PORT, err => {
    if (err) {
      return console.error(err)
    }
    console.info(`Running server on port ${PORT}.`)
  })
})
