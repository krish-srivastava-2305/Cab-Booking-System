import userModel from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, password, email }) => {
  if (!firstName || !password || !email) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    fullName: { firstName, lastName },
    password,
    email,
  });
  return user;
};
