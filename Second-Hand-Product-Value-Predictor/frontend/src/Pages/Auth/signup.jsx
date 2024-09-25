import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp(props){

  let [user,setUser] = useState({id:0,fullname:"",email:"",password:""})
  let navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/add-user",user)
    localStorage.setItem("userName",user.email)
    props.onSignUp()
    alert("Successfully Sing In")
    navigate('/')

  };

  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="mb-6 text-2xl font-bold text-blue-900">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-5 text-left">
            <label htmlFor="name" className="block mb-2 text-blue-900">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>          
          <div className="mb-5 text-left">
            <label htmlFor="name" className="block mb-2 text-blue-900">
              ID NO
            </label>
            <input
              type="integers"
              id="id"
              name="id"
              value={user.id}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5 text-left">
            <label htmlFor="email" className="block mb-2 text-blue-900">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5 text-left">
            <label htmlFor="password" className="block mb-2 text-blue-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          {/* <div className="mb-5 text-left">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-blue-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div> */}
          <button
            type="submit"
            className="bg-blue-900 text-white py-3 px-6 rounded w-full text-lg hover:bg-blue-800"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-5">
          Already have an account?{" "}
          <Link to="./login" className="text-blue-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
