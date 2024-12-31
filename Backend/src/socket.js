import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

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
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
      const user = await userModel.findOne({ socketId: socket.id });
      if (user) {
        await userModel.findByIdAndUpdate(user._id, { socketId: null });
      }
      const captain = await captainModel.findOne({ socketId: socket.id });
      if (captain) {
        await captainModel.findByIdAndUpdate(captain._id, { socketId: null });
      }
    });

    socket.on("update-captain-location", async (data) => {
      const { ltd, lng, captainId } = data;
      if (!ltd || !lng || !captainId) {
        console.log("error", ltd, lng, captainId);
        socket.emit("error", { message: "Invalid data" });
      }
      await captainModel.findByIdAndUpdate(captainId, {
        location: { ltd, lng },
      });
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId };
