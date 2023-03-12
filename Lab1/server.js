const dgram = require('dgram');
const server = dgram.createSocket('udp4');

let idArr = [];
let idCounter = 1;
let msgArr = [];
let msgInf = {};
let currentClientPort = 0;

server.on('error', (err) => {
  console.log(`error:\n${err.stack}`);
  server.close();
});

server.on('connection', socket => {
  console.log('client connected');
  server.rawListeners('Please type your name');
})

server.on('data', data=> {
  console.log('data');
})

server.on('message', (msg, rinfo) => {
  let msgStr = msg.toString();
  console.log(msgStr);
  if (msgStr.includes('Port:')) {
    currentClientPort = Number(msgStr.slice(msgStr.indexOf(' ') + 1));
    if (idArr.includes(currentClientPort)) {
      msgArr = msgInf[currentClientPort.toString()];
      msgInf[currentClientPort].forEach((msgEl) => {
        console.log(msgEl);
      })
    } else {
      msgArr = [];
      idArr.push(currentClientPort);
    }
  } else {
    msgArr.push(msgStr);
    msgInf[currentClientPort.toString()] = msgArr;
  }
  console.log(msgInf);

  console.log(`got a message from ${rinfo.address}:${rinfo.port}: ${msg}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`listening ${address.address}:${address.port}`);
});

server.bind(8082, '127.0.0.1');

let buffer = require('buffer');
let client = dgram.createSocket('udp4');

let data = Buffer.from('bebra');