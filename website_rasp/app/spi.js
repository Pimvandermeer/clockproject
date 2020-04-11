module.exports = () => {
  const spi = require('spi-device');

  const DATA = '0123456789012345678901234567890123456789\n';
    
  const wbuf = Buffer.from(DATA, 'hex');
  
  const message = [{
      sendBuffer: Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0xff]), // Sent to read channel 5
      //receiveBuffer: Buffer.alloc(3),              // Raw data read from channel 5
      byteLength: 8,
      speedHz: 20000 // Use a low bus speed to get a good reading from the TMP36
    }];
  
  const arduino = spi.openSync(0, 0);
  
  //arduino.getOptionsSync(option)
  // for (i = 0; i < 10; i++) {
  //     arduino.transferSync(message, (err, message) => {
  //         if (err) throw err});
  // };
  
  
arduino.transferSync(message);
  
  
  arduino.closeSync();
};
