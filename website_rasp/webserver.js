const express = require('express');
const app = express();
const path=require('path');
//const raspi = require('raspi');
//const Serial = require('raspi-serial').Serial;


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/'));  
});

app.use(express.static(path.join(__dirname, 'public/')));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

// raspi.init(() => {
//   var serial = new Serial();
//   serial.open(() => {
//     serial.on('data', (data) => {
//       process.stdout.write(data);
//     });
//     serial.write('Hello from raspi-serial');
//   });
// });
