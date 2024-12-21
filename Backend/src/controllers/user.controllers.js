import userModel from "../models/user.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

// Register a new user
const register = async (req, res) => {
  try {
    // Checks if there are any validation errors
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { email, password, fullName } = req.body;
    const { firstName, lastName } = fullName;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password for security purposes
    const hashPassword = await userModel.generateHash(password);

    // Create a new user using the createUser service
    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    // Generating a JWT token for the user
    const userDoc = await userModel.findById(user._id);
    const token = await userDoc.generateAuthToken();

    // Sending the token and user details in the response
    res.cookie("token", token);
    res.status(201).json({ token, user });
  } catch (error) {
    // Logging the error and send a response
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    // Checking for validation errors
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ errors: validations.array() });
    }

    // Extracting email and password from the request body and fetching user from DB
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Validating the password with help method defined over the user model
    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = await user.generateAuthToken();

    // Sending the token and user details in the response
    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // blacklisting the token
    const blackListToken = await blackListTokenModel.create({ token });

    // Clearing the token from the cookies
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res, next) => {
  return res.send(req.user);
};

export { login, register, logout, getUserProfile };
