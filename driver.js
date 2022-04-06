const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const driverCB = require('./client/driver/index.js');
const driverCBCopy = driverCB(socket);

socket.on('IN-TRANSIT', driverCBCopy);
