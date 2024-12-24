import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full">
        <h4 className="text-black font-extrabold text-3xl ml-4 mt-">Rido</h4>
      </div>
      <div className="h-1/5 w-full flex flex-col gap-4 py-5 px-2">
        <h3 className="text-2xl font-bold">Get Started with Rido</h3>
        <Link
          to={"/login"}
          className="bg-black w-4/5 p-3 text-lg font-semibold rounded-2xl flex justify-center items-center m-auto text-white"
        >
          <p>Continue</p>
        </Link>
      </div>
    </div>
  );
};

export default Start;
