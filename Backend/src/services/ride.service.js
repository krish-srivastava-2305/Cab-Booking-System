import rideModel from "../models/ride.model.js";
import { getAddressCoordinates, getDistanceAndTime } from "./map.service.js";

const fareCalculator = async (destination, origin) => {
  const baseFare = {
    car: 50,
    auto: 30,
    bike: 20,
  };

  const baseTime = {
    car: 20,
    auto: 15,
    bike: 10,
  };

  const distanceObject = await getDistanceAndTime(origin, destination);

  if (!distanceObject) {
    return null;
  }

  const distance = distanceObject.distance / 1000;
  const duration = distanceObject.duration / 60;

  const fare = {
    car: baseFare.car + distance * 10 + duration * baseTime.car,
    auto: baseFare.auto + distance * 8 + duration * baseTime.auto,
    bike: baseFare.bike + distance * 5 + duration * baseTime.bike,
  };

  return fare;
};

const createRide = async (
  origin,
  destination,
  vehicleType,
  id,
  pickup,
  drop
) => {
  if (!origin || !destination || !vehicleType || !id) {
    return null;
  }

  const fare = await fareCalculator(origin, destination);
  if (!fare) {
    return null;
  }

  const ride = await rideModel.create({
    user: id,
    pickup: pickup,
    destination: drop,
    fare: fare[vehicleType],
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
  });
  return ride;
};

const rideConfirmer = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    console.log("Ride ID and Captain ID are required");
    return null;
  }

  const existingRide = await rideModel.findById(rideId);
  if (!existingRide) {
    console.log("Ride not found");
    return null;
  }
  if (existingRide.status !== "pending") {
    console.log("Ride not pending");
    return null;
  }

  const updatedRide = await rideModel.findByIdAndUpdate(rideId, {
    captain: captainId,
    status: "accepted",
  });
  if (!updatedRide) {
    return null;
  }

  const ride = await rideModel
    .findById(rideId)
    .populate("captain")
    .populate("user")
    .select("+otp");
  return ride;
};

const startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};

const endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};

export { createRide, fareCalculator, rideConfirmer, startRide, endRide };
