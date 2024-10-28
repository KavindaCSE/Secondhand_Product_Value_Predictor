// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useGlobalContext } from "../context/GlobalContextProvider";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const { setIsLogged } = useGlobalContext(true);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLogged(true);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-50">
//       <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl text-center">
//         <h2 className="mb-6 text-3xl font-bold text-[#274C77]">Login</h2>
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8"
//         >
//           {/* Left Column */}
//           <div>
//             <div className="mb-5 text-left">
//               <label htmlFor="email" className="block mb-2 text-[#274C77]">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#274C77]"
//               />
//             </div>
//           </div>
//           {/* Right Column */}
//           <div>
//             <div className="mb-5 text-left relative">
//               <label htmlFor="password" className="block mb-2 text-[#274C77]">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   required
//                   className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#274C77]"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-3 flex items-center text-[#274C77] focus:outline-none"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* Full Width Button */}
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-3 px-6 rounded w-full text-lg hover:bg-[#274C77] shadow-md transition-all"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//         <p className="mt-5 text-gray-700">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-[#274C77] hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'; 

const Login = () => {
  const [userData , setUserData] = useState({"email" : "" , "password" : ""})
  const [showPassword, setShowPassword] = useState(false);
  const [isLogged, setIsLogged] = useState(false); // Local login state



  const handleSubmit = async (e) => {
    e.preventDefault();
    let respond = await axios.post("http://127.0.0.1:8000/api/login",userData)
    if (respond.data == "Invalid password"){
      alert("Login failed! Please try again.")
    }else{
      const decodedToken = jwtDecode(respond.data.access_token);
      setIsLogged(true);
      localStorage.setItem('id', decodedToken.sub);
      alert("Logged in successfully!");
      window.location = '/';
    }
  };

  const handleChange = (e) => {
    const {name , value} = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold text-[#274C77]">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left Column */}
          <div>
            <div className="mb-5 text-left">
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
          </div>
          {/* Right Column */}
          <div>
            <div className="mb-5 text-left relative">
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
                  name="eye"
                  className="absolute inset-y-0 right-3 flex items-center text-[#274C77] focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
          {/* Full Width Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded w-full text-lg hover:bg-[#274C77] shadow-md transition-all"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-5 text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#274C77] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      {isLogged && (
        <div className="mt-5 text-green-500">You are now logged in!</div>
      )}
    </div>
  );
};

export default Login;
