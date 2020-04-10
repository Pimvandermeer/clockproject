module.exports = () => {
  const spi = require('spi-device');

  const DATA = '0123456789012345678901234567890123456789\n';
    
  const wbuf = Buffer.from(DATA, 'hex');
  
  const message = [{
      sendBuffer: Buffer.from(DATA, 'utf-8'), // Sent to read channel 5
      //receiveBuffer: Buffer.alloc(3),              // Raw data read from channel 5
      byteLength: 41,
      speedHz: 20000 // Use a low bus speed to get a good reading from the TMP36
    }];
  
  const arduino = spi.openSync(0, 0);
  
  //arduino.getOptionsSync(option)
  // for (i = 0; i < 10; i++) {
  //     arduino.transferSync(message, (err, message) => {
  //         if (err) throw err});
  // };
  
  for (i = 0; i < 10; i++) {
      arduino.transferSync(message);
  };
  
  arduino.closeSync();
};
