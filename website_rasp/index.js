// import serial, { parsers } from "./app/serial.js";
//import webserver, { parsers } from "./app/webserver.js";
var webserver = require('./app/webserver.js');
var serial = require('./app/serial.js');
var spi = require('./app/spi.js');
// //serial();
// spi();
webserver();

var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 40510})
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })
});