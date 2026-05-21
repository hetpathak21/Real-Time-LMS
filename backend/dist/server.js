"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Database Connection
(0, db_1.default)();
// Create HTTP Server
const server = http_1.default.createServer(app_1.default);
// Socket.IO Setup
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});
io.on("connection", (socket) => {
    console.log(`⚡ User Connected: ${socket.id}`);
    socket.on("join", (userId) => {
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
