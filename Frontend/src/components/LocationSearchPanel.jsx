import React from "react";
import { MapPin } from "lucide-react";

const LocationSearchPanel = ({ setPickUp, setDestination }) => {
  return (
    <div>
      {/* Dummy Data */}
      <div
        className="flex items-center justify-center gap-3 mt-6"
        onClick={() => {
          setDestination(
            "551/251 Kanak Kunj, Natkhera Road, Alambagh, Lucknow - 226005"
          );
          setPickUp(
            "551/251 Kanak Kunj, Natkhera Road, Alambagh, Lucknow - 226005"
          );
        }}
      >
        <h2 className="h-12 w-20 rounded-2xl bg-[#eee] flex items-center justify-center">
          <MapPin size={24} />
        </h2>
        <p className=" font-bold">
          551/251 Kanak Kunj, Natkhera Road, Alambagh, Lucknow - 226005
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <h2 className="h-12 w-20 rounded-2xl bg-[#eee] flex items-center justify-center">
          <MapPin size={24} />
        </h2>
        <p className=" font-bold">
          551/251 Kanak Kunj, Natkhera Road, Alambagh, Lucknow - 226005
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <h2 className="h-12 w-20 rounded-2xl bg-[#eee] flex items-center justify-center">
          <MapPin size={24} />
        </h2>
        <p className=" font-bold">
          551/251 Kanak Kunj, Natkhera Road, Alambagh, Lucknow - 226005
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <h2 className="h-12 w-20 rounded-2xl bg-[#eee] flex items-center justify-center">
          <MapPin size={24} />
        </h2>
        <p className=" font-bold">
          551/251 Kanak Kunj, Natkhera Road, Alambagh, Lucknow - 226005
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <h2 className="h-12 w-20 rounded-2xl bg-[#eee] flex items-center justify-center">
          <MapPin size={24} />
        </h2>
        <p className=" font-bold">
          551/251 Kanak Kunj, Natkhera Road, Alambagh, Lucknow - 226005
        </p>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
