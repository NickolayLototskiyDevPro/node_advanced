const http = require('http');
const server1 = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2) + '\n' + req.url);
    res.end();
    //throw new Error("Error!!!");
    this.emit('error', new Error("Error!!!"));
});
server1.on("error", err=>console.log(err));
process.on('uncaughtException', err => {
    console.log(err)
})
server1.listen(3000);