import { Server } from "socket.io";

let io;

export const setupSocket = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    // Handle other Socket.io events
  });
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
