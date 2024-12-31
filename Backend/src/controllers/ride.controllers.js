import { validationResult } from "express-validator";
import { createRide, fareCalculator } from "../services/ride.service.js";
import {
  getAddressCoordinates,
  getCaptainsInRadius,
} from "../services/map.service.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";

const rideCreator = async (req, res) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res
        .status(500)
        .json({ message: "Validation Error", error: validations.array() });
    }

    const { origin, destination, vehicleType } = req.body;
    const originCoords = await getAddressCoordinates(origin);
    const destinationCoords = await getAddressCoordinates(destination);
    const user = req.user;
    const id = user._id;
    const pickup = origin;
    const drop = destination;
    const ride = await createRide(
      originCoords,
      destinationCoords,
      vehicleType,
      id,
      pickup,
      drop
    );

    if (!ride) {
      return res.status(500).json({ message: "Ride creation failed" });
    }

    res.status(200).json({ message: "Ride created successfully", ride });

    // Emit the ride to the captains
    const captains = await getCaptainsInRadius(
      originCoords.lat,
      originCoords.lng,
      5
    );

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .select("-otp")
      .populate("user");

    captains.forEach((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: { rideWithUser },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFare = async (req, res) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res
        .status(500)
        .json({ message: "Validation Error", error: validations.array() });
    }

    const { origin, destination } = req.query;
    console.log(origin, destination);

    const originCoords = await getAddressCoordinates(origin);
    const destinationCoords = await getAddressCoordinates(destination);
    const fare = await fareCalculator(destinationCoords, originCoords);

    if (!fare) {
      return res.status(500).json({ message: "Fare calculation failed" });
    }

    return res
      .status(200)
      .json({ message: "Fare calculated successfully", fare });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { rideCreator, getFare };
