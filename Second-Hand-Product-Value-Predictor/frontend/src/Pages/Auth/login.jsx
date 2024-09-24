import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import Background from "../../Components/Background";

function Login(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const { data: { access_token } } = await axios.post("http://127.0.0.1:8000/login", user);
      const decodedToken = jwtDecode(access_token);
      localStorage.setItem("userName", decodedToken.sub);
      props.onLogin(); // Call the onLogin prop to update the App state
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials."); // Display error message
      console.error(err); // Log the error for debugging
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
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
              onChange={handleChange}
              id="email"
              value={user.email}
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block mb-2 text-[#274C77]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              name="password"
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          {(user.email && user.password) ? (
            <button
              type="submit"
              className="bg-blue-900 text-white py-3 px-6 rounded w-full text-lg hover:bg-blue-800"
            >
              Login
            </button>
          ) : null}
          {error && <p className="text-red-500 mt-3">{error}</p>} {/* Display error if present */}
        </form>
        <p className="mt-5">
          Don't have an account? <Link to="/signup" className="text-blue-900">Sign up</Link>
        </p>
      </Background>
    </div>
  );
}

export default Login;
