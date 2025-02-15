import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { LogOutIcon } from "lucide-react";
import { captainContext } from "../contexts/captainContext";
import { socketContext } from "../contexts/socketContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);
  const [captain, setCaptain] = useState(null);

  async function confirmRide() {
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  const captainData = useContext(captainContext);
  const { socket } = useContext(socketContext);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.emit("join", {
  //     token: localStorage.getItem("token"),
  //     userType: "captain",
  //   });
  // });

  // useEffect(() => {
  //   const updateLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         socket.emit("update-captain-location", {
  //           token: localStorage.getItem("token"),
  //           ltd: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       });
  //     }
  //   };

  //   socket.on("new-ride", (data) => {
  //     if (!data) return;
  //     setRide(data.rideWithUser);
  //     setRidePopupPanel(true);
  //   });

  //   socket.on("error", (data) => {
  //     console.log(data);
  //   });

  //   updateLocation();
  //   const locationInterval = setInterval(updateLocation, 5000);

  //   return () => clearInterval(locationInterval);
  // }, [socket]);

  useEffect(() => {
    if (!socket) return;
  
    console.log("Joining socket...");
    socket.emit("join", {
      token: localStorage.getItem("token"),
      userType: "captain",
    });
  
    return () => {
      console.log("Leaving socket...");
      socket.off("join");
    };
  }, [socket]); // ✅ Runs only when `socket` changes
  
  useEffect(() => {
    if (!socket) return;
  
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-captain-location", {
            token: localStorage.getItem("token"),
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    };
  
    // ✅ Remove old event listeners before adding new ones
    socket.off("new-ride");
    socket.off("error");
  
    socket.on("new-ride", (data) => {
      if (!data) return;
      console.log("New ride received:", data);
      setRide(data.rideWithUser);
      setRidePopupPanel(true);
    });
  
    socket.on("error", (data) => {
      console.log("Socket error:", data);
    });
  
    updateLocation();
    const locationInterval = setInterval(updateLocation, 5000);
  
    return () => {
      clearInterval(locationInterval);
      socket.off("new-ride");
      socket.off("error");
    };
  }, [socket]); // ✅ Runs only when `socket` changes
  

  async function confirmRide() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain/logout"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <LogOutIcon />
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails captain={captainData.captain} />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
