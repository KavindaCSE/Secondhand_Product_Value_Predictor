import React from "react";
import seller from "../assets/seller.jpeg";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard/predict");
  };

  return (
    <section className="relative bg-white py-12 lg:py-28">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        
        {/* Left side: Text content */}
        <div className="lg:w-1/2 text-center lg:text-left px-6 mb-10 lg:mb-0">
          <p className="text-lg lg:text-xl text-gray-500 mb-6">
            Want to find the Best Price for Your Car?
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8">
            Predict Your Car Price
          </h1>
          <div className="space-x-4 mb-10">
            <button
              className="px-8 py-4 text-lg font-semibold bg-blue-500 text-white rounded hover:bg-[#274C77] transition duration-300"
              onClick={handleDashboard}
            >
              View Dashboard
            </button>
          </div>
          <p className="text-lg mb-5">Or Find Your Dream Car</p>
          <div className="flex justify-center lg:justify-start space-x-3">
            {["SUV", "Sedan", "Hatchback", "Coupe", "Hybrid"].map((type) => (
              <div
                key={type}
                className="px-6 py-3 text-base font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Large image */}
        <div className="lg:w-1/2 flex justify-center h-full">
          <img
            src={seller}
            alt="Car Seller"
            className="w-full lg:w-3/4 xl:w-full h-auto shadow-lg rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Inventory;
