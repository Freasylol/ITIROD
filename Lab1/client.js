const dgram = require('dgram');
const client = dgram.createSocket('udp4');
let stdin = process.stdin;
let stdout = process.stdout;
 
const host = '0.0.0.0';
let port = 8082;
let clientPort = 0;

console.log('Enter you port');
let message = '';
  
  process.stdin.on("data", data => {
    if (clientPort === 0) {
      clientPort = Number(data);
      client.bind(clientPort, '', () => {
        console.log('Client is running on ' + clientPort.toString());
      })
      message = "Port: " + clientPort.toString();
      client.send(message, 0, message.length, port, host, (err, bytes) => {
        if (err) {
          throw err;
        }
        console.log('Message sent');
      });
    } else {
      console.log('Please enter message');
      console.log('Data is ' + data);
      message = data;
      client.send(message, 0, message.length, port, host, (err, bytes) => {
        if (err) {
          throw err;
        }
        console.log('Message sent');
      });
    }
   
  })
 
client.on('message', (message, remote) => {
  console.log('Server: ' + message);
});





  if (message.length != 0) {
    sendMessage();
  }



function sendMessage() {
  client.send(message, 0, message.length, port, host, (err, bytes) => {
    if (err) {
      throw err;
    }
    console.log('Message sent');
  });
}
 
