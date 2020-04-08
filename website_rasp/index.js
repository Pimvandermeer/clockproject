// import serial, { parsers } from "./app/serial.js";
//import webserver, { parsers } from "./app/webserver.js";
var webserver = require('./app/webserver.js');
var serial = require('./app/serial.js');
var i2c = require('./app/i2c.js');
// //serial();
// i2c();
webserver();