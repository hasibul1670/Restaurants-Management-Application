import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import login from "../../assets/Animation/c1.json";
const Cooking = () => {
  return (
    <div className="py-2 px-5">
      <div className="hero min-h-screen bg-base-300">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-96 mb-10 md:mb-0 mx-auto">
            <Lottie animationData={login} loop={true} />
          </div>
          <div>
            <h1 className="text-2xl text-pink-800 font-bold">
              Your Orders is Cooking !! Please Wait
            </h1>
            <Link to="/">
              <button className="btn btn-primary btn-sm mt-2">
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cooking;
