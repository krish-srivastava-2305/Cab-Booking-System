import { Router } from "express";
import {
  getCoordinates,
  getDistanceAndTimeController,
  getSuggestionsController,
} from "../controllers/map.controllers.js";
import { body, query } from "express-validator";
import auth from "../middlewares/auth.middlware.js";

const mapRouter = Router();

// Route to get coordinates of an address
mapRouter.get(
  "/get-coordinates",
  auth,
  query("address").isString().notEmpty(),
  getCoordinates
);

// Route to get distance and time between two locations
mapRouter.post(
  "/get-distance",
  auth,
  body("origin.lng").isString().notEmpty().withMessage("Origin is required"),
  body("origin.lat").isString().notEmpty().withMessage("Origin is required"),
  body("destination.lng")
    .isString()
    .notEmpty()
    .withMessage("Destination is required"),
  body("destination.lat")
    .isString()
    .notEmpty()
    .withMessage("Destination is required"),
  getDistanceAndTimeController
);

// Route to get suggestions for an input
mapRouter.get(
  "/get-suggestions",
  auth,
  query("input").isString().notEmpty(),
  getSuggestionsController
);

export default mapRouter;
