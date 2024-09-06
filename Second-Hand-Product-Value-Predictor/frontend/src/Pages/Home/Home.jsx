import React, { useState, useEffect } from "react";
import "../../Components/components.css";
import "./Home.css";
import Background from "../../Components/Background";
import CarBrandsData from "../../Data/CarBrandsData";
import Data from "../../Data/labelmapping";
import tt from "../../Data/brand_to_model.json";
import axios from "axios";

function Home() {
  const [manuModels, setManuModels] = useState([]);
  const [unDisableModel, setUnDisableModel] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [price,setPrice] = useState(0)

  const [formData, setFormData] = useState({
    year: "",
    manufacturer:"",
    model:"",
    condition:"",
    fuel:"", 
    odometer: "",
    title_status:"", 
    transmission:"", 
    type:"", 
    age:""

  });
  const [newVehicle, setnewVehicle] = useState({
    year: "",
    manufacturer:"",
    model:"",
    condition:"",
    fuel:"", 
    odometer: "",
    title_status:"", 
    transmission:"", 
    type:"", 
    age:"",


  });

  useEffect(() => {
    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    let parsedValue,item,index;
    if (name === "model"){
      
      parsedValue = JSON.parse(value);
      item = Data.model[parsedValue.item]
      value = parsedValue.index
      
    }else if (name !== "odometer") {
      parsedValue = JSON.parse(value);
      item = parsedValue.item
      value = parsedValue.index
    }


    if (name === "manufacturer") {
      if (value !== "") {
        setUnDisableModel(true);
        setManuModels(tt[value]);
      } else {
        setUnDisableModel(false);
        setManuModels([]);
      }
      setFormData({ ...formData, manufacturer: value, model: "" });
      setnewVehicle({...newVehicle, manufacturer: item})
    } else if (name === "year") {
      let year = parseInt(value) + 2000;
      const today = new Date();
      const currentYear = today.getFullYear();
      const calculatedAge = currentYear - year;
      setFormData({
        ...formData,
        year: value,
        age: calculatedAge >= 0 ? calculatedAge : "",
      });
      setnewVehicle({
        ...newVehicle,
        year: item,
        age: calculatedAge >= 0 ? calculatedAge : "",
      })
    } else if (name === "odometer") {
      const intvalue = parseInt(value, 10);
      if (!isNaN(intvalue)) {
        setFormData({ ...formData, odometer: intvalue });
        setnewVehicle({ ...newVehicle, odometer: intvalue });
      }
    } else {
      
      setFormData({ ...formData, [name]: value });
      setnewVehicle({ ...newVehicle, [name]: item });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await axios.post("http://127.0.0.1:8000/prediction",formData)
    setPrice(result.data)
    
  };

  const handleAdd = async () => {
    const newdata = {...newVehicle}
    newdata["userid"] = 1
    newdata["price"] = price.toFixed(2)
    
    const respond = await axios.post("http://127.0.0.1:8000/add-vehicles",newdata)
    alert("Successfully added")
    window.location = "/"
  }

  return (
    <div className="flex flex-row justify-center items-start w-full h-max gap-[20px]">
      <Background className="flex flex-col justify-center items-center w-full h-full gap-[10px] p-6 rounded-lg shadow-lg bg-white">
        <div className="flex flex-row justify-start w-full p-1">
          <span className="font-lato text-[#274c77] text-[22px] font-bold">
            Used Car Price Calculator
          </span>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-row w-full">
            <div className="flex flex-col w-6/12 p-2 justify-start items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Brand
                </span>
              </div>
              <select
                name="manufacturer"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
              >
                <option value="">Select Brand</option>
                {Object.keys(Data.manufacturer).map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Model
                </span>
              </div>
              <select
                name="model"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
                disabled={!unDisableModel}
              >
                <option value="">Select Model</option>
                {manuModels.map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {Data.model[item]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Year
                </span>
              </div>
              <select
                name="year"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
              >
                <option value="">Select Year</option>
                {Object.keys(Data.year).map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Fuel
                </span>
              </div>
              <select
                name="fuel"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
              >
                <option value="">Select Fuel</option>
                {Object.keys(Data.fuel).map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Transmission
                </span>
              </div>
              <select
                name="transmission"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
              >
                <option value="">Select Transmission</option>
                {Object.keys(Data.transmission).map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Type
                </span>
              </div>
              <select
                name="type"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
              >
                <option value="">Select Type</option>
                {Object.keys(Data.type).map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Odometer
                </span>
              </div>
              <input
                type="text"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
                name="odometer"
                value={formData.odometer}
              />
            </div>
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Title Status
                </span>
              </div>
              <select
                name="title_status"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
              >
                <option value="">Select Title Status</option>
                {Object.keys(Data.title_status).map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Condition
                </span>
              </div>
              <select
                name="condition"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
              >
                <option value="">Select Condition</option>
                {Object.keys(Data.condition).map((item, index) => (
                  <option key={index} value={JSON.stringify({ item, index })}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-6/12 p-2 justify-center items-center">
              <div className="flex flex-col justify-start items-start max-w-[350px] w-full">
                <span className="text-black font-lato text-[15.16px] font-light">
                  Age
                </span>
              </div>
              <input
                type="text"
                onChange={handleChange}
                className="input-field w-full max-w-xs truncate"
                name="age"
                value={formData.age}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex flex-col w-6/12 p-1 mr-8">
              <button
                className={`p-1 bg-[#274C77] h-12 rounded-[8px] ${
                  !isFormValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
                disabled={!isFormValid}
              >
                <span className="text-[#F8F8FB]">Check Your Car</span>
              </button>
              </div>
            <div className="flex flex-col w-6/12 p-1 mr-8"></div>
          </div>
        </form>
        <button
                className={`p-1 bg-[#274C77] h-12 rounded-[8px] ${
                  !price
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
                onClick={handleAdd}
              >
                <span className="text-[#F8F8FB]">Adding for Sell</span>
        </button>
        <div className="flex flex-row w-full justify-center items-center h-[200px]">
          <h1 className="text-xl font-bold">Estimated Price = </h1>
          <span className="text-xl font-semibold text-green-600 ml-2">
            {/* Estimated price will be dynamically updated here */}
            {price.toFixed(2)} $
          </span>
        </div>
      </Background>
      {/* Top Brands Section */}
      <div className="flex flex-col justify-start items-center w-4/12 gap-[20px] h-full">
        <Background className="w-full h-full p-6 rounded-lg shadow-lg bg-white">
          <div className="flex flex-row justify-start w-full p-1">
            <span className="font-lato text-[#274c77] text-[18.16px] font-bold">
              Top Brands
            </span>
          </div>
          <div className="flex flex-col w-full justify-start p-1 gap-3">
            {CarBrandsData.map((item, index) => (
              <div
                key={index}
                className="rounded-lg py-1 px-3 shadow-sm w-full flex flex-row justify-between items-center "
              >
                <span>{item.title}</span>
                <img
                  className="w-[50px] h-[50px]"
                  src={item.icon}
                  alt={item.title}
                />
              </div>
            ))}
          </div>
        </Background>
      </div>
    </div>
  );
}

export default Home;
