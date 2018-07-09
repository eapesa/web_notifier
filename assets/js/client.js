$(document).ready(function() {
  // const socket = io();
  const socket = require('socket.io-client')();
  socket.emit("event", "HELLO WORLD!");
});
