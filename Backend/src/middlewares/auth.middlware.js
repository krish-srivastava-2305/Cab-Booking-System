import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blacklisting = await blackListTokenModel.findOne({ token });
    if (blacklisting) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default auth;
