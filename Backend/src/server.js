import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import http from "http";
import app from "./app.js";
import { connectDB } from "./db/connect.js";
import { initializeSocket } from "./socket.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const socket = initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });
