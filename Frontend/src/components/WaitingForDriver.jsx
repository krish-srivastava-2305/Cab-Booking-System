import { Circle, CreditCard, LocateIcon, Square } from "lucide-react";
import React from "react";

const WaitingForDriver = ({ ride }) => {
  if (!ride || !ride.captain) {
    return (
      <div className="p-12 flex justify-center items-center">
        Waiting for driver...
      </div>
    );
  }

  const driverName = `${ride.captain.fullName?.firstName ?? ""} ${
    ride.captain.fullName?.lastName ?? ""
  }`;
  const plateNumber = ride.captain.vehicle?.plate ?? "";
  const vehicleType = ride.captain.vehicle?.vehicleType ?? "";
  const fare = Math.ceil(ride.fare) || 0;
  const pickUp = ride.pickUp;
  const destination = ride.destination;
  const otp = ride.otp;

  return (
    <div className="p-12 w-full flex justify-center items-center flex-col">
      <div className="w-full flex flex-col gap-4 items-center">
        <img
          className="h-32"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Driver Vehicle"
        />
        <div className="w-full flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold capitalize">{driverName}</h2>
          <h4 className="text-2xl font-bold -mt-1 -mb-1">{plateNumber}</h4>
          <p className="text-md text-gray-600 capitalize">{vehicleType}</p>
          <h1 className="text-lg font-semibold">OTP: {otp}</h1>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="w-full flex items-center gap-5 p-3 border-b-2">
            <Square fill="black" size={10} />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{pickUp}</p>
            </div>
          </div>
          <div className="w-full flex items-center gap-5 p-3 border-b-2">
            <Circle fill="black" size={10} />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{destination}</p>
            </div>
          </div>
          <div className="w-full flex items-center gap-5 p-3">
            <CreditCard size={10} />
            <div>
              <h3 className="text-lg font-medium">₹ {fare} </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
