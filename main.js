const config = require('config')
const routeRegistrar = require('./lib/routeregistrar')
const streamRegistrar = require('./lib/streamregistrar')
const logger = require('./plugins/log')

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                logger('Error loading index.html')
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
let PORT = process.env.PORT || config.port || 3000
console.log(PORT)
app.listen(PORT);

// Listen to events on the specified namespace
let NAMESPACE = config.namespace || '/'
const nameSpace = io.of(NAMESPACE).on('connection', routeRegistrar)

module.exports.app = app
module.exports.socket = nameSpace

// Start consuming the streams
streamRegistrar()
