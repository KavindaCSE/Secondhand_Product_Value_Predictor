import React from "react";
import { Link } from "react-router-dom";

function Header({ onAuthentication, onLogout }) {
  return (
    <header className="flex justify-between items-center bg-gray-100 py-4 px-8 shadow-lg fixed w-full z-50">
      <div className="company_name">
        <Link to="/">
          <span className="text-[#274C77] text-2xl font-bold">
            Second Hand Product Value Predictor
          </span>
        </Link>
      </div>
      <div className="profile_details flex items-center gap-4">
        {onAuthentication ? (
          <>
            {/* <span>
              <img
                src="assets/images.jpeg"
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </span> */}
            <Link to="/myaccount">
              <span className="text-[#274C77] text-sm">My Account</span>
            </Link>

            <button onClick={onLogout} className="px-4 py-2" id="logout">
              <span className="font-bold text-red-600 hover:text-red-800 drop-shadow-md">
                Logout
              </span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-[#274C77] hover:text-[#F3F4F6] px-4 py-2 rounded hover:bg-[#274C77]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-[#274C77] hover:text-[#F3F4F6] px-4 py-2 rounded hover:bg-[#274C77]"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
