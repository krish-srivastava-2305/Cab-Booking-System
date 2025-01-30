import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { captainContext } from "../contexts/captainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(captainContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = { email, password };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        captainData,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const { token, captain } = res.data;
        console.log(captain);
        setCaptain({
          fullName: captain.fullName,
          id: captain._id,
        });
        localStorage.setItem("token", token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold my-4">Rido</h1>
        <h2 className="text-xl font-bold my-4">Captain-Login</h2>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
