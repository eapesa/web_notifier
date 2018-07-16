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

const SOCKETS = {};
io.on("connection", (socket) => {
  console.log("New socket connection " + socket.id);
  SOCKETS[socket.id] = {
    idle: 0,
    press: 0
  };

  const THRESHOLDS = config.threshold;
  socket.on("keepalive", (data) => {
    SOCKETS[socket.id][data] += 1;
    if (SOCKETS[socket.id][data] >= THRESHOLDS[data]) {
      console.log("Threshold for keepalive = <<" + data + ">> is met. Inform client!");
      socket.emit("alert", "idle");
      SOCKETS[socket.id][data] = 0;
    }
  });

  socket.on("event", (data) => {
    SOCKETS[socket.id][data] += 1;
    SOCKETS[socket.id]["idle"] = 0;
    if (SOCKETS[socket.id][data] >= THRESHOLDS[data]) {
      console.log("Threshold for event = <<" + data + ">> is met. Inform client!");
      socket.emit("alert", "press");
      SOCKETS[socket.id][data] = 0;
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket " + socket.id + " disconnected...");
    SOCKETS[socket.id] = undefined;
  });
});
