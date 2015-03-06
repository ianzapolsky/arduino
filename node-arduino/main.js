var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sys = require("sys");

var sp = new SerialPort("/dev/tty.usbmodemfd121", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
});

sp.open(function (err) {
  console.log('Serial Port Opened');
  sp.on('data', function(data) {
    console.log(data);
  });
});
