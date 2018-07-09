"use strict";

import http from "http";
import express from "express";
import bodyParser from "body-parser";
import SocketIO from "socket.io";
import config from "./config.js";

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/assets", express.static(__dirname + "/assets"));

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("Server listens at port " + port);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/assets/index.html");
});

const sockets = {};
io.on("connection", (socket) => {
  console.log("New socket connection " + socket.id);
  sockets[socket.id] = 0;

  socket.on("keepalive", (data) => {
    const THRESHOLD = config.sleep_threshold;
    sockets[socket.id] += 1;
    if (sockets[socket.id] >= THRESHOLD) {
      console.log("Threshold is met. Inform client!");
      socket.emit("alert", "hello " + socket.id);
      sockets[socket.id] = 0;
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket " + socket.id + " disconnected...");
    sockets[socket.id] = undefined;
  });
});
