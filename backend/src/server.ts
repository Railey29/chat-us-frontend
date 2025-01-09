import http from "http";
import express from "express";
import {Server, Socket} from "socket.io";

const app = express();

const server = app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("New User connected");

  // When a message is sent
  socket.on("send a message", (message: string) => {
    // Emit the message back to the sender so they can see it as "You: message"
    socket.emit("received message", message); // Emit to the sender

    // Emit the message to all other clients (excluding the sender)
    socket.broadcast.emit("received message", message); // Emit to other clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
