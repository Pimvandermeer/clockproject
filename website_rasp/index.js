// import serial, { parsers } from "./app/serial.js";
//import webserver, { parsers } from "./app/webserver.js";
var webserver = require('./app/webserver.js');
var serial = require('./app/serial.js')
// //serial();
webserver();