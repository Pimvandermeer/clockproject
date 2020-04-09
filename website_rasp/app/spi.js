module.exports = () => {
	const spi = require('spi-device');

const DATA = 'test\n';
	
const wbuf = Buffer.from(DATA, 'hex');

const message = [{
    sendBuffer: Buffer.from(DATA, 'utf-8'), // Sent to read channel 5
    //receiveBuffer: Buffer.alloc(3),              // Raw data read from channel 5
    byteLength: 5,
    speedHz: 20000 // Use a low bus speed to get a good reading from the TMP36
  }];

const option = [{threeWire: true}]

const arduino = spi.openSync(0, 0);

//arduino.getOptionsSync(option)
for (i = 0; i < 10; i++) {
    arduino.transferSync(message);
};


arduino.closeSync();
};
