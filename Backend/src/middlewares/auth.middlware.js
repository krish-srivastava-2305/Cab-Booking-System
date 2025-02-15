import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    console.log("cookies", token);
    if (!token || token === "null") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blacklisting = await blackListTokenModel.findOne({ token });
    if (blacklisting) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(id);
    const captain = await captainModel.findById(id);
    if (!user && !captain) {
      return res.status(404).json({ message: "User or captain not found" });
    }

    if (captain) {
      req.captain = captain;
    }
    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default auth;
