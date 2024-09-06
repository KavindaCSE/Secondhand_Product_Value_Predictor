import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import SideBar from "./SideBar/sidebar";
import Header from "./Header/Header";
import Home from "./Pages/Home/Home";
import BrowseCars from "./Pages/BrowseCars/BrowseCars";
import MyListings from "./Pages/MyListings/MyListings";
import MyAccount from "./Pages/MyAccount/MyAccount";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import FirstSignIn from "./Pages/firstsigninpage";
import NewCar from "./Components/NewCar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const location = useLocation();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <Header
        onAuthentication={isAuthenticated}
        onLogout={handleLogout}
      ></Header>
      <div className="layout">
        {!hideSidebar && (
          <div className="sidebar-dev">
            <SideBar />
          </div>
        )}
        <div
          className={`main-content ${isAuthenticated ? "with-sidebar" : ""}`}
        >
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
            <Route path="/" element={<Home />} />
            <Route path="/browsecars" element={<BrowseCars />} />
            <Route path="/aboutus" element={<AboutUs />} />
            {isAuthenticated ? (
              <>
                <Route path="/mylistings" element={<MyListings />}>
                  <Route path="/mylistings/newcar" element={<NewCar />} />
                </Route>
                <Route path="/myaccount" element={<MyAccount />} />
              </>
            ) : (
              <Route path="*" element={<FirstSignIn />} />
            )}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;