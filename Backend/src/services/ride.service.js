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

const createRide = async (origin, destination, vehicleType, id) => {
  if (!origin || !destination || !vehicleType || !id) {
    return null;
  }
  const originCoords = await getAddressCoordinates(origin);
  const destinationCoords = await getAddressCoordinates(destination);

  console.log("Origin: ", originCoords, "Destination: ", destinationCoords);

  const fare = await fareCalculator(originCoords, destinationCoords);
  if (!fare) {
    return null;
  }

  const ride = await rideModel.create({
    user: id,
    pickup: origin,
    destination: destination,
    fare: fare[vehicleType],
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
  });
  console.log("ride: ", ride);
  return ride;
};

export { createRide, fareCalculator };
