module.exports = () => {
  const express = require('express');
  const app = express();
  const path=require('path');
  const ws = require('ws')

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/'));  
  });

  app.use(express.static(path.join(__dirname, '../public/')));

  app.listen(8080, function () {
      console.log('Example app listening on port 8080!');
  });

  var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})
  wss.on('connection', function (ws) {
    ws.on('message', function (message) {
      console.log('received: %s', message)
    })

    // setInterval(       TO check if there is a connection
    //   () => ws.send(`${new Date()}`),
    //   1000
    // )
  })



};