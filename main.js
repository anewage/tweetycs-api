const config = require('config')
const routeRegistrar = require('./lib/routeregistrar')

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}
let fs = require('fs')
let app = require('http').createServer(handler)
let io = require('socket.io')(app);

// Start the server on the specified port
let PORT = config.port || 2000
app.listen(PORT);

// Listen to events on the specified namespace
let NAMESPACE = config.namespace || '/'
const nameSpace = io.of(NAMESPACE).on('connection', routeRegistrar)
