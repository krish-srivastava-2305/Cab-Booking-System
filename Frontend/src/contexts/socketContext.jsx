import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

const socketContext = createContext();

function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BASE_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected to server: ${newSocket.id}`);
    });

    newSocket.on("disconnect", () => {
      console.log(`Disconnected from server: ${newSocket.id}`);
    });
  }, []);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
}

export { socketContext, SocketContextProvider };
