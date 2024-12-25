import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  });
  return <div>{children}</div>;
};

export default CaptainProtectWrapper;
