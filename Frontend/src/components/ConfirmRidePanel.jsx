import { Circle, CreditCard, IdCard, IndianRupee, Square } from "lucide-react";
import React from "react";

const ConfirmRidePanel = ({ setRideFound }) => {
  return (
    <div className="h-full p-12 w-full flex justify-between items-center flex-col">
      <div className="h-40 w-[78%] rounded-2xl flex items-center justify-center overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png"
          alt="car"
        />
      </div>
      <div className="h-40 w-full flex flex-col gap-4">
        <h1 className="flex items-center gap-4 border-b-2 pb-2">
          <span>
            <Circle fill="black" size={10} />
          </span>
          <span className="text-2xl font-bold">11-B</span>BakerVille, New Delhi
        </h1>
        <h1 className="flex items-center gap-4 border-b-2 pb-2">
          <span>
            <Square fill="black" size={10} />
          </span>
          <span className="text-2xl font-bold">16-C</span>Sarojni, New Delhi
        </h1>
        <h1 className="flex items-center gap-4 border-b-2 pb-2">
          <span>
            <CreditCard size={12} fill="black" />
          </span>
          <span className="text-2xl font-bold">
            <p className="flex items-center gap-1">
              <IndianRupee size={24} strokeWidth={3} />
              455
            </p>
          </span>
          Cash Cash
        </h1>
      </div>
      <button
        onClick={() => setRideFound(true)}
        className="w-full bg-black text-white px-12 py-4 rounded-2xl text-xl font-semibold"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRidePanel;
