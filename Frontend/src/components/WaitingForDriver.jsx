import { Circle, CreditCard, LocateIcon, Square } from "lucide-react";
import React from "react";

const WaitingForDriver = () => {
  return (
    <div className=" p-12 w-full flex justify-center items-center flex-col">
      <div className="w-full flex flex-col gap-4 items-center justify-between">
        <img
          className="h-32"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold capitalize">Alok</h2>
          <h4 className="text-2xl font-bold -mt-1 -mb-1">UP34UT3456</h4>
          <p className="text-md text-gray-600">Maruti Suzuki Alto</p>
          <h1 className="text-lg font-semibold">6587</h1>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="w-full flex items-center gap-5 p-3 border-b-2">
            <Square fill="black" size={10} />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                11-B BakerVille, New Delhi
              </p>
            </div>
          </div>
          <div className="w-full flex items-center gap-5 p-3 border-b-2">
            <Circle fill="black" size={10} />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                16-C Sarojni, New Delhi
              </p>
            </div>
          </div>
          <div className="w-full flex items-center gap-5 p-3">
            <CreditCard size={10} />
            <div>
              <h3 className="text-lg font-medium">₹ 244 </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
