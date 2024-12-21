import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: String,
  },
  { timestamps: true }
);

// User Methods for password hashing, password validation and generating JWT token

userSchema.statics.generateHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.validPassword = async function (password) {
  console.log(password, this.password);
  if (!this.password) console.log("No password in document");

  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
