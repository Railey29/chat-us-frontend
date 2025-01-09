const functions = require("firebase-functions");
const express = require("express");
const http = require("http");
const {Server} = require("socket.io"); // Corrected

// Initialize Express app
const app = express();

// Create an HTTP server with Express
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server);

// Route for testing
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Setup Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log("Received Message:", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

// Export Firebase Function with Express and Socket.IO
exports.api = functions.https.onRequest(app);

// Setup the server to listen on the specified port (for local testing)
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
