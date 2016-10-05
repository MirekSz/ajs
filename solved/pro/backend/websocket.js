var http = require('http');
var sockjs = require('sockjs');
var node_static = require('node-static');

var echo = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'});
// 2. Static files server
var static_directory = new node_static.Server(__dirname);
var connections = [];
echo.on('connection', function (conn) {
    connections.push(conn);
    conn.on('data', function (message) {
        for (var conna of connections) {
            console.log('readyState ', conna.readyState, connections.length);
            if (conna !== conn)
                conna.write(message);
        }
    });
    conn.on('close', function () {
    });
});

var server = http.createServer();
server.addListener('request', function (req, res) {
    static_directory.serve(req, res);
});
server.addListener('upgrade', function (req, res) {
    res.end();
});

echo.installHandlers(server, {prefix: '/echo'});
server.listen(3000, '0.0.0.0');
