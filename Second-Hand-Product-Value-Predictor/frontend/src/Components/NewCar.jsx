import React, { useState } from "react";
import Background from "./Background";
import Data from "../Data/labelmapping";
import brand_to_model from "../Data/brand_to_model.json";
import axios from 'axios';


function NewCar({ showMyListings }) {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    transmission: "",
    odometer: "",
    fuel: "",
    type: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9pE1unAgfEwRJT9oLvHfrm_JnSerVBwOLPg&s",
    price: "",
    sellerId: localStorage.getItem("id"),
    sold : false
  });

  const [manuModels, setManuModels] = useState([]);
  const [unDisableModel, setUnDisableModel] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let updatedFormData = { ...formData, [name]: value };
  
    // Handle specific cases for brand, year, and odometer
    if (name === "brand") {
      if (value !== "") {
        setUnDisableModel(true);
        setManuModels(brand_to_model[Data.manufacturer[value]]);
      } else {
        setUnDisableModel(false);
        setManuModels([]);
      }
      updatedFormData = { ...updatedFormData, brand: value, model: "" };
    } else if (name === "odometer") {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        updatedFormData = { ...updatedFormData, odometer: intValue };
      }
    }
  
    setFormData(updatedFormData);
  
    // Validate the form after updating the formData
    const isFormComplete = Object.values(updatedFormData).every(
      (item) => item !== ""
    );
    setIsFormValid(isFormComplete);
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/add-vehicles",formData);
    window.location.reload()
  };

  return (
    <Background className="flex flex-col justify-start items-center w-8/12 gap-2 h-svh p-6">
      <div className="flex flex-col items-start justify-center w-full p-4">
        <div className="flex flex-row justify-between w-full p-1">
          <span className="topic text-2xl font-bold text-[#274C77]">
            List Your Car
          </span>
          <button
            className="px-2 py-1 bg-[#274C77] rounded-[5px]"
            onClick={showMyListings}
          >
            <span className="text-[#E6EBEE]">Back</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl-6 rounded-lg">
          <div className="flex flex-row items-center mb-6">
            <input
              accept="image/*"
              className="hidden"
              id="raised-button-file"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="raised-button-file">
              <div className="inline-block mt-2 py-2 px-4 border border-gray-300 bg-gray-200 rounded-md shadow-sm cursor-pointer hover:bg-gray-300">
                Upload Image
              </div>
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Car Preview"
                className="m-8 w-64 h-40 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="input-name">Brand</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="rounded-lg w-full h-[35px] border border-[#274c7778] px-3  max-w-xs truncate"
              >
                <option value="">Select Brand</option>
                {Object.keys(Data.manufacturer).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="input-name">Model</label>
              <select
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
                disabled={!unDisableModel}
              >
                <option value="">Select Model</option>
                {manuModels.map((item, index) => (
                  <option key={index} value={item}>
                    {Data.model[item]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="input-name">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
              >
                <option value="">Select Year</option>
                {Object.keys(Data.year).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="input-name">Fuel</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
              >
                <option value="">Select Fuel</option>
                {Object.keys(Data.fuel).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="input-name">Transmission</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
              >
                <option value="">Select Transmission</option>
                {Object.keys(Data.transmission).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="input-name">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
              >
                <option value="">Select Type</option>
                {Object.keys(Data.type).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="input-name">Odometer</label>
              <input
                type="text"
                onChange={handleChange}
                className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
                name="odometer"
                value={formData.odometer}
              />
            </div>
            <div className="flex flex-col">
              <label className="input-name">price</label>
              <input
                type="text"
                onChange={handleChange}
                className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
                name="price"
                value={formData.price}
              />
            </div>
          </div>
          <div className="flex justify-start mt-6 w-6/12">
            <button
              className={`p-3 bg-[#274C77] w-full max-w-sm rounded-[8px] text-white ${
                !isFormValid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#1B3A5A] hover:cursor-pointer"
              }`}
              disabled={!isFormValid}
            >
              List Your Car
            </button>
          </div>
        </form>
      </div>
    </Background>
  );
}

export default NewCar;
