import React, { createContext, useState } from "react";

const captainContext = createContext();

const CaptainContextComponent = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
  });

  const value = { captain, setCaptain };
  return (
    <div>
      <captainContext.Provider value={value}>
        {children}
      </captainContext.Provider>
    </div>
  );
};

export { captainContext, CaptainContextComponent };
