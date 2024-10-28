import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onAuthentication, onLogout }) => {
  return (
    <header className="flex justify-between items-center p-6 bg-blue-900 shadow-md sticky top-0 z-20 border-b border-gray-700">
      {/* Logo Section */}
      <div className="text-2xl font-bold text-white hover:text-gray-300 transition">
        <Link to="/" className="hover:text-gray-300">
          AutoMart
        </Link>
      </div>

      {/* Authentication Section */}
      <div className="space-x-3 flex items-center">
        {localStorage.getItem("id") ? (
          <>
            {/* My Account Link */}
            <Link
              to="/dashboard/myaccount"
              className="text-white text-sm hover:text-gray-300 transition"
            >
              My Account
            </Link>
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <Link
              to="/login"
              className="px-4 py-2 border border-white text-white hover:bg-white hover:text-blue-900 rounded-md transition"
            >
              Login
            </Link>
            {/* Signup Button */}
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded-md transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
