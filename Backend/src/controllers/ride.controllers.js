import { validationResult } from "express-validator";
import { createRide, fareCalculator } from "../services/ride.service.js";
import { getAddressCoordinates } from "../services/map.service.js";

const rideCreator = async (req, res) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res
        .status(500)
        .json({ message: "Validation Error", error: validations.array() });
    }

    const { origin, destination, vehicleType } = req.body;
    const user = req.user;
    const id = user._id;
    const ride = await createRide(origin, destination, vehicleType, id);

    if (!ride) {
      return res.status(500).json({ message: "Ride creation failed" });
    }

    return res.status(200).json({ message: "Ride created successfully", ride });
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
