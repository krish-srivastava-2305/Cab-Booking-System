import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

captainSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET
  );
};

const captainModel = mongoose.model("Captain", captainSchema);

export default captainModel;
