import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";

const LiveTracking = ({ destination }) => {
  const [destinationCoords, setDestinationCoords] = useState("");
  useEffect(() => {
    const getLtdLng = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/map/get-coordinates?input=${destination}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (res.status !== 200) return;
        setDestinationCoords(res.data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
    if (destination) {
      getLtdLng();
    }
  }, [destination]);

  const [currentLocation, setCurrentLocation] = useState([28.6139, 77.209]); // Default location (Delhi)
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    mapRef.current = L.map("map").setView(currentLocation, 20);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [currentLocation]);

  useEffect(() => {
    const updateLocation = (position) => {
      const newLocation = [position.coords.latitude, position.coords.longitude];
      setCurrentLocation(newLocation);
    };

    const handleError = (error) => {
      console.error("Geolocation error:", error.message);
    };

    const watchId = navigator.geolocation.watchPosition(
      updateLocation,
      handleError,
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (currentLocation && destination && mapRef.current) {
      // Remove existing routing control
      if (routingControlRef.current) {
        mapRef.current.removeControl(routingControlRef.current);
      }

      // Add new routing control
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation[0], currentLocation[1]),
          L.latLng(destination.lat, destination.lng),
        ],
        routeWhileDragging: false,
        lineOptions: {
          styles: [{ color: "#0073ff", weight: 4 }],
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
      }).addTo(mapRef.current);
    }
  }, [currentLocation, destination]);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
};

export default LiveTracking;
