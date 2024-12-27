import { IndianRupee, Timer, User } from "lucide-react";
import React, { useEffect } from "react";

const VehicleSelectionPanel = ({ setConfirmRidePanel }) => {
  return (
    <div className="h-[100%] px-4 py-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-4">Select your ride</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Rido Car */}
        <div
          className="w-full hover:border-2 border-gray-800 rounded-xl py-2 px-4 flex items-center gap-4 cursor-pointer"
          onClick={() => setConfirmRidePanel(true)}
        >
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png"
              alt="car"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h4 className="font-semibold text-lg">Rido Car</h4>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <Timer size={16} />2 mins
              </span>
              <span className="flex items-center gap-1">
                <User size={16} />
                <span>4</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-semibold text-lg">
            <IndianRupee size={18} />
            <p>455</p>
          </div>
        </div>

        {/* Rido Auto */}
        <div
          className="w-full border-2 border-gray-800 rounded-xl py-2 px-4 flex items-center gap-4 cursor-pointer"
          onClick={() => setConfirmRidePanel(true)}
        >
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center overflow-hidden bg-gray-100">
            <img
              className="h-full w-full object-cover"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
              alt="auto"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h4 className="font-semibold text-lg">Rido Auto</h4>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <Timer size={16} />3 mins
              </span>
              <span className="flex items-center gap-1">
                <User size={16} />
                <span>3</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-semibold text-lg">
            <IndianRupee size={18} />
            <p>225</p>
          </div>
        </div>

        {/* Rido Bike */}
        <div
          className="w-full border-2 border-gray-800 rounded-xl py-2 px-4 flex items-center gap-4 cursor-pointer"
          onClick={() => setConfirmRidePanel(true)}
        >
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center overflow-hidden bg-gray-100">
            <img
              className="h-full w-full object-cover"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              alt="bike"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h4 className="font-semibold text-lg">Rido Bike</h4>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <Timer size={16} />1 min
              </span>
              <span className="flex items-center gap-1">
                <User size={16} />
                <span>1</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-semibold text-lg">
            <IndianRupee size={18} />
            <p>145</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelectionPanel;
