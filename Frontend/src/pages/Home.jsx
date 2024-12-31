import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CircleArrowDown, LucideArrowDownNarrowWide, X } from "lucide-react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSelectionPanel from "../components/VehicleSelectionPanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { userContext } from "../contexts/userContext";
import { socketContext } from "../contexts/socketContext";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [rideFound, setRideFound] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState("");
  const [fare, setFare] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanel = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const rideFoundRef = useRef(null);

  const { user } = useContext(userContext);
  const { socket } = useContext(socketContext);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join", { userId: user.id, userType: "user" });
  }, [socket]);

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          opacity: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanel.current, {
        height: "70%",
      });
    } else {
      gsap.to(vehiclePanel.current, {
        height: "0%",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        height: "70%",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        height: "0%",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (rideFound) {
      gsap.to(rideFoundRef.current, {
        height: "70%",
      });
    } else {
      gsap.to(rideFoundRef.current, {
        height: "0%",
      });
    }
  }, [rideFound]);

  useEffect(() => {
    if (pickUp && activeInput === "pickUp") {
      const timeoutId = setTimeout(() => {
        fetchSuggestions(pickUp, setSuggestions);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [pickUp, activeInput]);

  useEffect(() => {
    if (destination && activeInput === "destination") {
      const timeoutId = setTimeout(() => {
        fetchSuggestions(destination, setSuggestions);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [destination, activeInput]);

  const findTrip = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/ride/get-fare?origin=${pickUp}&destination=${destination}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFare(response.data.fare);
    } catch (error) {
      console.log(error);
    }
    setVehiclePanelOpen(true);
    setPanelOpen(false);
  };

  const fetchSuggestions = async (input, setSuggestions) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/map/get-suggestions?input=${input}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <h1 className="text-3xl font-bold absolute top-5 left-5">Rido</h1>
      <div className="h-full w-full flex justify-center items-center">
        <img
          src={"/exampleMap.png"}
          className="h-screen w-screen object-cover"
        />
      </div>
      {/* Location Search Panel */}
      <div className="flex flex-col h-screen absolute top-0 justify-end w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <X />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className="relative py-3">
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("pickUp");
              }}
              value={pickUp}
              onChange={(e) => {
                setPickUp(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveInput("destination");
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setDestination={setDestination}
            setPickUp={setPickUp}
            suggestions={suggestions}
            activeInput={activeInput}
          />
        </div>
      </div>
      {/* Car Selection Panel */}
      <div
        ref={vehiclePanel}
        className="h-0 w-full flex flex-col justify-center items-center bg-white absolute bottom-0 "
      >
        <div
          className={`mt-4 ${vehiclePanelOpen ? "visible" : "hidden"}`}
          onClick={() => setVehiclePanelOpen(false)}
        >
          <CircleArrowDown stroke="gray" />
        </div>
        <VehicleSelectionPanel
          setConfirmRidePanel={setConfirmRidePanel}
          fare={fare}
          setSelectedVehicle={setSelectedVehicle}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        className="absolute bottom-0 z-10 w-full h-0 bg-white flex flex-col items-center justify-center"
      >
        <div
          className={`mt-4 ${confirmRidePanel ? "visible" : "hidden"}`}
          onClick={() => setConfirmRidePanel(false)}
        >
          <CircleArrowDown stroke="gray" />
        </div>
        <ConfirmRidePanel
          setRideFound={setRideFound}
          selectedVehicle={selectedVehicle}
          pickUp={pickUp}
          destination={destination}
          fare={fare}
        />
      </div>
      {/* Waiting for driver panel */}
      <div
        ref={rideFoundRef}
        className="absolute bottom-0 z-10 w-full h-0 bg-white"
      >
        <WaitingForDriver />
      </div>
    </div>
  );
};

export default Home;
