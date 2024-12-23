import captainModel from "../models/captain.model.js";

const createCaptain = async ({
  fullName: { firstName, lastName },
  email,
  password,
  vehicle: { vehicleType, color, capacity, plate },
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !vehicleType ||
    !color ||
    !capacity ||
    !plate
  ) {
    throw new Error("All fields are required");
  }

  const captain = captainModel.create({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: { vehicleType, color, capacity, plate },
  });

  return captain;
};

export { createCaptain };
