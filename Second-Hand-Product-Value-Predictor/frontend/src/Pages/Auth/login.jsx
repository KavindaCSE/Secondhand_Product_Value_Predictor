import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Background from "../../Components/Background";

const Login = () => {
  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Add form handling logic here
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Background className="rounded-lg shadow-lg w-full max-w-md text-center mb-12">
        <h2 className="mb-6 text-2xl font-bold text-blue-900">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 text-left">
            <label htmlFor="email" className="block mb-2 text-[#274C77]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block mb-2 text-[274C77]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-900 text-white py-3 px-6 rounded w-full text-lg hover:bg-blue-800"
          >
            Login
          </button>
        </form>
        <p className="mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#274C77] hover:underline">
            Sign Up
          </Link>
        </p>
      </Background>
    </div>
  );
};

export default Login;
