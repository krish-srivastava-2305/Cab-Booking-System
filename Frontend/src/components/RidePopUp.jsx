import React from "react";
import {
  MapPinIcon,
  UserCircle,
  BanknoteIcon,
  XCircle,
  CheckCircle,
} from "lucide-react";

const RidePopUp = (props) => {
  return (
    <div className="bg-white relative min-h-[50vh]">
      {/* Header */}
      <div className="sticky top-0 bg-white pb-4 border-b">
        <div
          className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 mt-2 cursor-pointer"
          onClick={() => props.setRidePopupPanel(false)}
        />
        <h3 className="text-2xl font-bold text-center">
          New Ride Request
          <span className="block text-sm font-normal text-gray-500 mt-1">
            Expires in 30 seconds
          </span>
        </h3>
      </div>

      <div className="space-y-6 p-4">
        {/* User Info Card */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full object-cover border-2 border-yellow-400"
                src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                alt="User"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {props.ride?.user.fullName.firstName}{" "}
                {props.ride?.user.fullName.lastName}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="flex items-center">⭐ 4.8</span>
                <span>•</span>
                <span>150 rides</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h5 className="text-2xl font-bold text-green-600">2.2 KM</h5>
            <p className="text-sm text-gray-500">away</p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="space-y-4 bg-gray-50 p-4 rounded-2xl">
          <div className="flex items-start gap-4 relative">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPinIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="h-14 w-0.5 bg-gray-200" />
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <MapPinIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Pickup Location</h3>
                <p className="text-gray-600">{props.ride?.pickup}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Drop Location</h3>
                <p className="text-gray-600">{props.ride?.destination}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Details */}
        <div className="bg-gray-50 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <BanknoteIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">Estimated Fare</p>
                <h3 className="text-2xl font-bold">
                  ₹{Math.round(props.ride?.fare)}
                </h3>
              </div>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full">
              <p className="text-green-700 font-medium">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 pt-4 space-y-3">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className="bg-green-600 hover:bg-green-700 w-full text-white font-semibold p-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle className="h-5 w-5" />
            Accept Ride
          </button>

          <button
            onClick={() => props.setRidePopupPanel(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold p-4 rounded-xl text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <XCircle className="h-5 w-5" />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
