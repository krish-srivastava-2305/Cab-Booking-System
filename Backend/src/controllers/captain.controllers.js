import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";
import captainModel from "../models/captain.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";

const register = async (req, res) => {
  try {
    // Validate request
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ message: validations.array() });
    }

    // Extracting data from request body
    const { fullName, email, password, vehicle } = req.body;
    const { firstName, lastName } = fullName;
    const { color, plate, vehicleType, capacity } = vehicle;

    // Checking if captain already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // Checking if vehicle already exists
    const existingVehicle = await captainModel.findOne({
      "vehicle.plate": plate,
    });
    console.log(existingVehicle);
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }

    // Hashing password
    const hashedPassword = await captainModel.hashPassword(password);

    // Creating captain
    const captain = await createCaptain({
      fullName,
      email,
      password: hashedPassword,
      vehicle,
    });

    // Generating token
    const captainDoc = await captainModel.findOne({ email });
    const token = captainDoc.generateAuthToken();

    res.cookie("token", token);
    // Sending response
    return res.status(201).json({ captain, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: validations.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await captain.validatePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token);

    return res.status(200).json({ captain, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blackListTokenModel.create({ token });

    res.clearCookie(token);

    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCaptainProfile = async (req, res) => {
  try {
    return res.status(200).json({ captain: req.captain });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { register, login, logout, getCaptainProfile };
