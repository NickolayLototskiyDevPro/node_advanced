const server = require('net').createServer();
const client = require('net').Socket();

const port = 8080;

server.on('connection', socket => {
  socket.setEncoding('utf8');

  socket.on('data', data => {

    console.log('\x1b[34m%s\x1b[0m', 'Client says:', data.toString());
    setTimeout(() => {
      socket.write(randomString());
    }, getDelay());
  });

});

server.listen(port, () => {
  console.log('Server started at ' + port);
});

/* START CLIENT */

client.connect(port, '127.0.0.1');

client.write(randomString());

client.on('data', function(data) {
  console.log('\x1b[33m%s\x1b[0m', '                                      Server says:', data.toString());
  setTimeout(() => {
    client.write(randomString());
  }, getDelay())
});

function randomString() {
  const arr = [];
  for (let i = 0; i < 20; i++) arr.push(String.fromCharCode(Math.ceil(Math.random() * 26) + 100));
  return arr.join('');
}

function getDelay() {
  return (Math.ceil(Math.random() * 5) + 2) * 1000;
}
