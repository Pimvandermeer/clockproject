module.exports = () => {
    const serialport = require("serialport");

    var port = new serialport('/dev/ttyS0', {
      baudRate:9600,
      //parser:serialport.parsers.readline('\n')
    });

    const Readline = serialport.parsers.Readline;
    const parser = new Readline();
    port.pipe(parser);

    port.on('open',onPortOpen);
    parser.on('data', onData);
    port.on('close', onClose);
    port.on('error', onError);
    port.write('Hi Mom!');

    function onPortOpen(){
      console.log("port Open");
    };
    function onData(data){
      console.log("data receiver: " + data);
    };
    function onClose(){
      console.log("port closed");
    };
    function onError(){
      console.log("something went wron in serial commucication")
    };
};