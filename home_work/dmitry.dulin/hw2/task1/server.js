const server = require('net').createServer()
const PORT = process.env.PORT || 8080

let counter = 0
let sockets = {}

server.on('connection', socket => {
  socket.id = counter++
  socket[socket.id] = socket

  socket.write('Welcome new client')

  socket.on('data', data => {
    Object.entries(sockets).forEach(([, cs]) => {
       if (cs.id != socket.id) {
         cs.write(`${socket.id}: ${data}`)
         cs.write(data)
       }
     }, this)
  })

  socket.end('end', () => {
    delete sockets[socket.id]
    console.log('Client disconnected')
  })

})

server.listen(PORT, () => {
  console.info(`Running server on port ${PORT}.`)
})
