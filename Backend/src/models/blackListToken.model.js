import mongoose, { Schema } from "mongoose";

const blackListTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

const blackListTokenModel = mongoose.model(
  "blackListToken",
  blackListTokenSchema
);

export default blackListTokenModel;
