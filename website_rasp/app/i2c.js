module.exports = () => {
const i2c = require('i2c-bus');

const arduino_ADDR = 0x04; 

const TEMP_REG = "some test";

const wbuf = Buffer.from([TEMP_REG]);

i2c.openPromisified(1).
then(i2c1 => i2c1.i2cWrite(arduino_ADDR, wbuf.length, wbuf).
	then(_ => i2c1.close())
).catch(console.log);
};