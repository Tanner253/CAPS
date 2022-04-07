"use strict";

const io = require("socket.io")(3000);
//localhost:3000/caps
const Queue = require("./lib/Queue/index.js");
const messageQueue = new Queue();
const vendorQueue = new Queue();
const driverQueue = new Queue();

const caps = io.of("/caps");

caps.on("connection", (socket) => {
  console.log("Connection made to the CAPS namespace!", socket.id);

  socket.onAny((event, payload) => {
    console.log("EVENT ::" + event);
    console.log(payload);
  });

  socket.on("join", ({ queueId }) => {
    socket.join(queueId);
    socket.emit("join", queueId);
  });

  // socket.on("message", (payload) => {
  //   let currentQueue = messageQueue.read(payload.queueId);
  //   if (!currentQueue) {
  //     let queueKey = messageQueue.store(payload.queueId, new Queue());
  //     currentQueue = messageQueue.read(queueKey);
  //   }
  //   currentQueue.store(payload.messageId, payload);
  //   messages.emit("message", payload);
  // });

  // socket.on("received", (payload) => {
  //   let currentQueue = messageQueue.read(payload.queueId);
  //   if (!currentQueue) {
  //     throw new Error("no queue created yet");
  //   }
  //   let message = currentQueue.remove(payload.messageId);
  //   messages.emit("received", message);
  // });

  // socket.on('get-messages', (payload) => {
  //   let currentQueue = messageQueue.read(payload.queueId);
  //   Object.keys(currentQueue.data).forEach(messageId => {
  //     // read messages from our Queue, send each on to the intended recepient.
  //     messages.emit('message', currentQueue.read(messageId));
  //   });
  // });

  socket.on("PICK-UP-READY", (payload) => {
    console.log("hit pick up");
    let currentQueue = vendorQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = vendorQueue.store(payload.queueId, new Queue());
      currentQueue = vendorQueue.read(queueKey);
    }
    currentQueue.store(payload.packageId, payload);
    caps.emit("PICK-UP-READY", payload);
  });

  socket.on("PICKED-UP-BY-DRIVER", (payload) => {
    let currentQueue = vendorQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error("no queue created yet");
    }
    let message = currentQueue.remove(payload.packageId);
    caps.emit("PICKED-UP-BY-DRIVER", message);
  });

  socket.on('CATCH-UP-VENDOR-MESSAGES', (payload) => {
    let currentQueue = vendorQueue.read(payload.queueId);
    Object.keys(currentQueue.data).forEach(packageId => {
      // read messages from our Queue, send each on to the intended recepient.
      caps.emit('CATCH-UP-VENDOR-MESSAGES', currentQueue.read(packageId));
    });
  });

  socket.on("DRIVER-IN-TRANSIT", (payload) => {
    console.log("hit pick up");
    let currentQueue = driverQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = driverQueue.store(payload.queueId, new Queue());
      currentQueue = driverQueue.read(queueKey);
    }
    currentQueue.store(payload.packageId, payload);
    caps.emit("DRIVER-IN-TRANSIT", payload);
  });

  socket.on("PICKED-UP-BY-DRIVER", (payload) => {
    let currentQueue = driverQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error("no queue created yet");
    }
    let message = currentQueue.remove(payload.packageId);
    caps.emit("PICKED-UP-BY-DRIVER", message);
  });

  socket.on('CATCH-UP-VENDOR-MESSAGES', (payload) => {
    let currentQueue = driverQueue.read(payload.queueId);
    Object.keys(currentQueue.data).forEach(packageId => {
      // read messages from our Queue, send each on to the intended recepient.
      caps.emit('CATCH-UP-VENDOR-MESSAGES', currentQueue.read(packageId));
    });
  });

  socket.on("DELIVERED", (payload) => {
    console.log("hit in delivered");
    caps.emit("DELIVERED", payload);
  });
});
