import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
import jwt, { decode } from "jsonwebtoken";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      method: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.on("join", async (data) => {
      const { token, userType } = data;
      if (!token || !userType) {
        console.log("Invalid data", token, userType);
        socket.emit("error", { message: "Invalid data" });
        return;
      }

      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    socket.on("update-captain-location", async (data) => {
      const { ltd, lng, token } = data;
      if (!ltd || !lng || !token) {
        console.log("error", ltd, lng, token);
        socket.emit("error", { message: "Invalid data" });
      }
      const decodedToken = jwt.decode(token);
      const captainId = decodedToken.id;

      await captainModel.findByIdAndUpdate(captainId, {
        location: { ltd, lng },
      });
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId };
