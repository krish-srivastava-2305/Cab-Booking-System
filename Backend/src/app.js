import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";
import mapRouter from "./routes/map.routes.js";
import rideRouter from "./routes/ride.routes.js";

app.use("/user", userRouter);
app.use("/captain", captainRouter);
app.use("/map", mapRouter);
app.use("/ride", rideRouter);

export default app;
