import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CircleArrowDown, LucideArrowDownNarrowWide, X } from "lucide-react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSelectionPanel from "../components/VehicleSelectionPanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanel = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const rideFoundRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [rideFound, setRideFound] = useState(false);

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

  const findTrip = () => {
    setVehiclePanelOpen(true);
    setPanelOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
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
        <VehicleSelectionPanel setConfirmRidePanel={setConfirmRidePanel} />
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
        <ConfirmRidePanel setRideFound={setRideFound} />
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
