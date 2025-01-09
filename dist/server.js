"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("New User connected");
    // When a message is sent
    socket.on("send a message", (message) => {
        // Emit the message back to the sender so they can see it as "You: message"
        socket.emit("received message", message); // Emit to the sender
        // Emit the message to all other clients (excluding the sender)
        socket.broadcast.emit("received message", message); // Emit to other clients
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
