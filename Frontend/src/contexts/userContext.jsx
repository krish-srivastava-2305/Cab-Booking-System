import React, { createContext, useState } from "react";

const userContext = createContext();

const UserContextComponent = ({ children }) => {
  const [user, setUser] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    id: "",
  });
  const value = { user, setUser };

  return (
    <div>
      <userContext.Provider value={value}> {children} </userContext.Provider>
    </div>
  );
};

export { UserContextComponent, userContext };
