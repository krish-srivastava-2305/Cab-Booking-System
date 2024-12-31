import React from "react";
import { MapPin } from "lucide-react";

const LocationSearchPanel = ({
  setPickUp,
  setDestination,
  suggestions,
  activeInput,
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">
        {activeInput === "pickUp"
          ? "Pick-Up Suggestions"
          : "Destination Suggestions"}
      </h3>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="flex items-center justify-start gap-3 mt-6 cursor-pointer"
          onClick={() => {
            if (activeInput === "pickUp") {
              setPickUp(suggestion.properties.label);
            } else {
              setDestination(suggestion.properties.label);
            }
          }}
        >
          <h2 className="h-12 w-12 rounded-full bg-[#eee] flex items-center justify-center">
            <MapPin size={24} />
          </h2>
          <p className="font-bold">{suggestion.properties.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
