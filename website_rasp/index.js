// import serial, { parsers } from "./app/serial.js";
//import webserver, { parsers } from "./app/webserver.js";
var webserver = require('./app/webserver.js');
var serial = require('./app/serial.js');
//var spi = require('./app/spi.js');
// //serial();
//spi();
webserver();

//const spi = require('spi-device');

var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 40510})
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    let jsonObject = JSON.parse(message);
    let spiMotor = jsonObject.motor;
    let spiObjectState = jsonObject.colorState;

    sendSPIObject(spiMotor, spiObjectState);   //ENABLE FOR RASPBERRY

   // console.log(spiMotor, spiObjectState);

  });
});

function sendSPIObject (spiMotor, spiMotorState) {
  let sendBytesArray = [];
  let editData = map_range(spiMotorState, 0, 1, 0, 10);
  sendBytesArray.push(spiMotor);
  sendBytesArray.push(editData);
  sendBytesArray.push(0xFF);
  console.log(sendBytesArray);
  
  
  
  
  const message = [{
    sendBuffer: Buffer.from(sendBytesArray), // Sent to read channel 5
    //receiveBuffer: Buffer.alloc(3),              // Raw data read from channel 5
    byteLength: 3,
    speedHz: 20000 // Use a low bus speed to get a good reading from the TMP36
  }];

  const arduino = spi.openSync(0, 0);
      
  arduino.transferSync(message);
  
 // arduino.closeSync();
}

function map_range(value, low1, high1, low2, high2) {
  let editData = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  editData = Math.floor(editData);
  return editData;
}