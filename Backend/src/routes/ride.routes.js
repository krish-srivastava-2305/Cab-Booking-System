import { Router } from "express";
import auth from "../middlewares/auth.middlware.js";
import { body, query } from "express-validator";
import { getFare, rideCreator } from "../controllers/ride.controllers.js";

const rideRouter = Router();

rideRouter.post(
  "/create",
  auth,
  body("origin")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Origin is required"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination is required"),
  body("vehicleType")
    .isString()
    .isIn(["bike", "car", "bus"])
    .withMessage("Invalid vehicle type"),
  rideCreator
);

rideRouter.get(
  "/get-fare",
  auth,
  query("origin").isString().withMessage("Origin is required"),
  query("destination").isString().withMessage("Destination is required"),
  getFare
);

export default rideRouter;
