"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var http_1 = require("http");
var express_1 = require("express");
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server);
app.get("/", function (req, res) {
  res.send("Hello, world!");
});
io.on("Connection", function (socket) {
  console.log("New client connected");
  socket.on("Message", function (message) {
    console.log("Recieved Message:", message);
    io.emit("Message", message);
    socket.on("disconnect", function () {
      console.log("Client Disconnected");
    });
  });
});
var PORT = 5000;
server.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});
