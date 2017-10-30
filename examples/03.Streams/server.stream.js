const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const request = fs.writeFile('request.txt', JSON.stringify(req));
    

    let body = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      body += chunk
    });

    req.on('end', () => {
      const data = JSON.parse(body)
      res.write(body)
      res.end()
    });
});

server.listen(3000);