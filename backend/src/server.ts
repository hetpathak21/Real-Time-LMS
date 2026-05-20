import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import app from "./app"
import connectDB from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`⚡ User Connected: ${socket.id}`);

  socket.on("join", (userId: string) => {
    socket.join(userId);

    console.log(`👤 User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected");
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});