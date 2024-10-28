import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Predict from "./Pages/Predict";
import BrowseCars from "./Pages/BrowseCars";
import MyListings from "./Pages/MyListings";
import MyAccount from "./Pages/MyAccount";
import AboutUs from "./Pages/AboutUs";
import NewCar from "./Components/NewCar";
import DashBoard from "./Pages/DashBoard";
import { useGlobalContext } from "./context/GlobalContextProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Landing from "./Pages/Landing";
import UpdateCar from "./Components/UpdateCar";

function App() {
  const { isLogged, setIsLogged } = useGlobalContext();
  const location = useLocation();

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLogged(false);
    window.location = '/';
};

  return (
    <>
      <Header onAuthentication={isLogged} onLogout={handleLogout} />
      <main className="">
        {location.pathname === "/" && (
          <>
            <Landing />
          </>
        )}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              <DashBoard onAuthentication={isLogged} onLogin={handleLogin} />
            }
          >
            <Route path="predict" element={<Predict />} />
            <Route path="browsecars" element={<BrowseCars />} />
            <Route
              path="mylistings"
              element={
                <ProtectedRoute>
                  <MyListings />
                </ProtectedRoute>
              }
            />
            <Route
              path="mylistings/newcar"
              element={
                <ProtectedRoute>
                  <NewCar />
                </ProtectedRoute>
              }
            />
            <Route
              path="mylistings/edit"
              element={
                <ProtectedRoute>
                  <UpdateCar />
                </ProtectedRoute>
              }
            />
            <Route
              path="myaccount"
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
            />

            <Route path="aboutus" element={<AboutUs />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
