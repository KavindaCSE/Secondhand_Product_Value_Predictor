import React, { useState , useEffect} from "react";
import axios from "axios";
import Background from "../Components/Background";
import image from "../assets/images.jpeg";

function MyAccount() {
  const [selectedImage, setSelectedImage] = useState(image);
  const [userData , setUserData] = useState({"fullname":"","id":null,"email":"","contactNo":""});
  const userId = localStorage.getItem("id") ; 
  const [changePassword , setChangePassword] = useState({"id":userId , "currentPassword":"","newPassword":"","confirmPassword":""})

  useEffect(() => {
    // Fetch the list of cars from the API
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get_user/${userId}`);
        setUserData(response.data); // Assuming response contains car data
      } catch (error) {
        console.error("Error fetching the car list:", error);
      }
    };

    fetchCars();
  }, []); 
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.put("http://127.0.0.1:8000/api/change-user-details",userData)
    alert("updated successfully")
  }

  const handleChange = (e) => {
    const UpdateduserData = {...userData, [e.target.id] : e.target.value}
    setUserData(UpdateduserData)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handlePassword = (e) => {
    const updatePassword = {...changePassword,[e.target.name] : e.target.value};
    setChangePassword(updatePassword);
  }

  const managePassword = async (e) => {
    e.preventDefault();
    
    const respond = await axios.put("http://127.0.0.1:8000/api/change-password",changePassword);
    console.log("hi")
    if (respond.data === "New Password Invalid"){
      alert("New Password Invalid")}
    else if (respond.data === "Invalid Current password"){
      alert("Invalid Current password")}
    else{
      alert("Password Changed")}
      window.location = '/dashboard/myaccount'

  }

  return (
    <div className="flex flex-row h-svh bg-white">
      <Background className="w-8/12 flex flex-col h-full gap-6 p-6 bg-white items-stretch">
        <div className="flex flex-row justify-start w-full mb-4">
          <span className="topic text-2xl font-bold text-[#274C77]">
            My Account
          </span>
        </div>

        <div className="flex flex-row items-center gap-5">
          <div className="w-32 h-32">
            <img
              src={selectedImage}
              alt="Profile"
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <form className="flex flex-col w-full gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="flex flex-col w-6/12">
            <label
              className="input-name text-lg font-medium mb-2"
              htmlFor="fullname"
            >
              Name :
            </label>
            <input
              type="text"
              id="fullname"
              value = {userData.fullname}
              onChange = {handleChange}
              className="rounded-lg w-full h-[35px] border border-[#274c7778] px-3  max-w-xs truncate"
            />
          </div>

          <div className="flex flex-col w-6/12">
            <label
              className="input-name text-lg font-medium mb-2"
              htmlFor="email"
            >
              e-mail :
            </label>
            <input
              type="email"
              id="email"
              value = {userData.email}
              onChange = {handleChange}
              className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
            />
          </div>

          <div className="flex flex-col w-6/12">
            <label
              className="input-name text-lg font-medium mb-2"
              htmlFor="contactNo"
            >
              Contact No :
            </label>
            <input
              type="text"
              id="contactNo"
              value= {userData.contactNo}
              onChange = {handleChange}
              className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="p-3 bg-[#274C77] h-12 rounded-lg px-8 text-white font-medium hover:bg-[#1d3a5a] transition-colors">
              Update
            </button>
          </div>
        </form>
      </Background>
      <Background className="w-4/12 flex flex-col h-vah gap-6 p-6 bg-white shadow-inner">
        <div className="flex flex-row justify-start w-full mb-4">
          <span className="topic text-2xl font-bold text-[#274C77]">
            Change Password
          </span>
        </div>

        <form className="flex flex-col gap-4 w-full" onSubmit={managePassword}>
          <div className="flex flex-col">
            <label
              className="text-lg font-medium mb-1"
              htmlFor="currentPassword"
            >
              Current Password:
            </label>
            <input
              type="text"
              name="currentPassword"
              value={changePassword.currentPassword}
              onChange={handlePassword}
              className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
              placeholder="Enter current password"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium mb-1" htmlFor="newPassword">
              New Password:
            </label>
            <input
              type="text"
              name="newPassword"
              value={changePassword.newPassword}
              onChange={handlePassword}
              className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
              placeholder="Enter new password"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-lg font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <input
              type="text"
              name="confirmPassword"
              value={changePassword.confirmPassword}
              onChange={handlePassword}
              className="rounded-lg  h-[35px] border border-[#274c7778] px-3 w-full max-w-xs truncate"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex justify-end items-end">
            <button
              type="submit"
              className="p-3 bg-[#274C77] h-12 rounded-lg px-6 text-white font-medium hover:bg-[#1d3a5a] transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </Background>
    </div>
  );
}

export default MyAccount;
