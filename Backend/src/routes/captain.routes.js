import { Router } from "express";
import {
  getCaptainProfile,
  login,
  register,
  logout,
} from "../controllers/captain.controllers.js";
import { body } from "express-validator";
import auth from "../middlewares/auth.middlware.js";

const captainRouter = Router();

captainRouter.post(
  "/register",
  [
    body("fullName.firstName").isString().isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("vehicle.color").isString().isLength({ min: 3 }),
    body("vehicle.plate").isString().isLength({ min: 3 }),
    body("vehicle.vehicleType").isString().isIn(["car", "motorcycle", "auto"]),
    body("vehicle.capacity").isNumeric(),
  ],
  register
);

captainRouter.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  login
);

captainRouter.get("/logout", auth, logout);

captainRouter.get("/profile", auth, getCaptainProfile);

export default captainRouter;
