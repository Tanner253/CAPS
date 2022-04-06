"use strict";

const io = require("socket.io")(3000);
const caps = io.of("/caps");
//localhost:3000/caps


caps.on('connection', (socket) => {
  console.log('Connection made to the CAPS namespace!', socket.id);

  socket.on("PICK-UP", (payload) => {
    console.log("hit pick up");
    caps.emit("PICK-UP", payload);
  });

  socket.on("IN-TRANSIT", (payload) => {
    console.log("hit in transit");
    caps.emit("IN-TRANSIT", payload)
  });

  socket.on('DELIVERED', (payload) => {
    console.log("hit in delivered");
    //sends emit to the socket 
    caps.emit("DELIVERED", payload)
  });

})