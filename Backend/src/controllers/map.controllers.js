import { validationResult } from "express-validator";
import {
  getAddressCoordinates,
  getDistanceAndTime,
  getSuggestions,
} from "../services/map.service.js";

// Controller to get coordinates of an address
const getCoordinates = async (req, res) => {
  try {
    // error input checks
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ message: validations.array() });
    }

    // address from query
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    // getting coordinates
    const coordinates = await getAddressCoordinates(address);
    if (!coordinates) {
      return res.status(400).json({ message: "Coordinates not found" });
    }

    // sending response
    return res.status(200).json(coordinates);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get distance and time between two locations
const getDistanceAndTimeController = async (req, res) => {
  try {
    // error input checks
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ message: validations.array() });
    }

    // origin and destination from query
    const { origin, destination } = req.body;
    if (!origin || !destination) {
      return res
        .status(400)
        .json({ message: "Origin and destination are required" });
    }

    // getting distance and time
    const getdistanceAndTime = await getDistanceAndTime(origin, destination);
    if (!getdistanceAndTime) {
      return res.status(400).json({ message: "Distance and time not found" });
    }
    return res.status(200).json(getdistanceAndTime);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get suggestions based on input
const getSuggestionsController = async (req, res) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ message: validations.array() });
    }

    // input from query
    const { input } = req.query;
    if (!input) {
      return res.status(400).json({ message: "Input is required" });
    }

    // getting suggestions
    const suggestions = await getSuggestions(input);
    if (!suggestions) {
      return res.status(400).json({ message: "Suggestions not found" });
    }

    // sending response
    return res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getCoordinates,
  getDistanceAndTimeController,
  getSuggestionsController,
};
