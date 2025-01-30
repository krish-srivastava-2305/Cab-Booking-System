import { Circle, CreditCard, IdCard, IndianRupee, Square } from "lucide-react";
import React from "react";

const ConfirmRidePanel = ({
  setRideFound,
  handleConfirmRide,
  selectedVehicle,
  pickUp,
  destination,
  fare,
}) => {
  let imageUrl = "";
  let selectedFare = 0;
  switch (selectedVehicle) {
    case "car":
      imageUrl =
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png";
      selectedFare = Math.ceil(fare?.car) || 0;
      break;
    case "auto":
      imageUrl =
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
      selectedFare = Math.ceil(fare?.auto) || 0;
      break;
    case "bike":
      imageUrl =
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
      selectedFare = Math.ceil(fare?.bike) || 0;
      break;
    default:
      imageUrl =
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png";
  }
  return (
    <div className="h-full p-12 w-full flex justify-between items-center flex-col">
      <div className="h-40 w-[78%] rounded-2xl flex items-center justify-center overflow-hidden">
        <img className="h-full w-full object-cover" src={imageUrl} alt="car" />
      </div>
      <div className="h-40 w-full flex flex-col gap-4">
        <h1 className="flex items-center gap-4 border-b-2 pb-2 text-md">
          <span>
            <Circle fill="black" size={10} />
          </span>
          {pickUp}
        </h1>
        <h1 className="flex items-center gap-4 border-b-2 pb-2 text-md">
          <span>
            <Square fill="black" size={10} />
          </span>
          {destination}
        </h1>
        <h1 className="flex items-center gap-4 border-b-2 pb-2">
          <span>
            <CreditCard size={12} fill="black" />
          </span>
          <p className="flex items-center gap-1 text-md">
            <IndianRupee size={10} />
            {selectedFare}
          </p>
          Cash Cash
        </h1>
      </div>
      <button
        onClick={handleConfirmRide}
        className="w-full bg-black text-white px-12 py-4 rounded-2xl text-xl font-semibold"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRidePanel;
