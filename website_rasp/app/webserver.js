module.exports = () => {
  const express = require('express');
  const app = express();
  const path=require('path');

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/'));  
  });

  app.use(express.static(path.join(__dirname, '../public/')));

  app.listen(8080, function () {
      console.log('Example app listening on port 8080!');
  });
};