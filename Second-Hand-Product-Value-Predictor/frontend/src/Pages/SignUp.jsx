import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios" ;
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    id: null,
    fullname: "",
    email: "",
    contactNo: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // form submission logic here
    await axios.post("http://127.0.0.1:8000/api/add-user",userData)
    window.location = '/login'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <h2 className="col-span-2 text-3xl font-bold text-center text-blue-900 mb-6">
        Create an Account
      </h2>

      {/* Full Name Input */}
      <div className="mb-5">
        <label htmlFor="fullname" className="block mb-2 text-blue-900">
          Full Name
        </label>
        <input
          type="text"
          name="fullname"
          value={userData.fullname}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#274C77]"
        />
      </div>

      {/* Id Input */}
      <div className="mb-5">
        <label htmlFor="id" className="block mb-2 text-blue-900">
          ID
        </label>
        <input
          type="integer"
          name="id"
          value={userData.id}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#274C77]"
        />
      </div>

      {/* Email Input */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-[#274C77]">
          Email Address
        </label>
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#274C77]"
        />
      </div>

      {/* Contact Number Input */}
      <div className="mb-5">
        <label htmlFor="contactNo" className="block mb-2 text-[#274C77]">
          Contact Number
        </label>
        <input
          type="text"
          name="contactNo"
          value={userData.contactNo}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#274C77]"
        />
      </div>

      {/* Password Input */}
      <div className="mb-5 relative">
        <label htmlFor="password" className="block mb-2 text-[#274C77]">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#274C77]"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-[#274C77] focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 mt-5">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-[#274C77] shadow-md transition-all"
        >
          Sign Up
        </button>
      </div>

      {/* Already have an account */}
      <div className="md:col-span-2 text-center">
        <p className="mt-5 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
