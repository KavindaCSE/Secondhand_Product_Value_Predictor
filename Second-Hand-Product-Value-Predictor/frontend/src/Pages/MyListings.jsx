import React, { useState , useEffect } from "react";
import Background from "../Components/Background";
import NewCar from "../Components/NewCar";
import axios from "axios";
import AdvertisementListing from "../Components/AdvertisementListing";
import AdvertisementData from "../Data/AdvertisementData";

function MyListings() {
  const [showNewCar, setShowNewCar] = useState(false);
  let sellerId = localStorage.getItem("id");
  const [currentAds , setCurrentAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [sellar , setSellar] = useState({"fullname":"","email":"","contactNo":""}) ; 

  
  useEffect(() => {
    // Fetch the list of cars from the API
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get-vehicles-sellerId/${sellerId}`);
        setCurrentAds(response.data); // Assuming response contains car data

        const details = await axios.get(`http://127.0.0.1:8000/api/get_user/${sellerId}`)
        setSellar(details.data);
      } catch (error) {
        console.error("Error fetching the car list:", error);
      }
    };

    fetchCars();
  }, []);


  const totalPages = Math.ceil(AdvertisementData.length / itemsPerPage);

  const onShowMyListings = () => {
    setShowNewCar(false);
  };

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page change
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  // const changeBoolean(){
  //   return !sold;
  // }

  // Filter the advertisements based on the search term
  const filteredAds = AdvertisementData.filter((ad) => {
    return (
      ad.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="flex flex-row justify-center items-start w-full h-full gap-5">
      {!showNewCar ? (
        <>
          <Background className="flex flex-col justify-start items-center w-full h-full gap-1 p-6">
            <div className="flex flex-row justify-between w-full p-1">
              <span className="font-lato text-[#274c77] text-2xl font-bold">
                My Listings
              </span>
              <button
                className="px-2 py-1 bg-[#274C77] rounded-md"
                onClick={() => setShowNewCar(true)}
              >
                <span className="text-[#E6EBEE]">Add New Car</span>
              </button>
            </div>

            {/* Search input */}
            <div className="w-full mb-2">
              <input
                type="text"
                className="rounded-lg w-full h-9 border border-gray-300 px-3"
                placeholder="Search Here"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Items per page dropdown */}
            <div className="flex justify-end items-center w-full py-2">
              <label htmlFor="itemsPerPage" className="text-[#274c77]">
                Items per page : &nbsp;
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="rounded-lg border border-[#274c7778] px-3 py-1"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>

            {/* Listings */}
            <div className="w-full grid grid-cols-5 gap-3">
              {currentAds.length > 0 ? (
                currentAds.map((ad, index) => (
                  <AdvertisementListing
                    key={index}
                    brand={ad.brand}
                    model={ad.model}
                    year={ad.year}
                    transmission={ad.transmission}
                    odometer={ad.odometer}
                    price={ad.price}
                    fuel={ad.fuel}
                    image={ad.image}
                    sold={ad.sold}
                  />
                ))
              ) : (
                <div className="col-span-5 text-center">No results found</div>
              )}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center mt-4">
              {Array.from(
                { length: Math.ceil(filteredAds.length / itemsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 mx-1 ${
                      currentPage === index + 1
                        ? "bg-[#274C77] text-white"
                        : "bg-gray-200 text-black"
                    } rounded-md`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </Background>
        </>
      ) : (
        <>
          <div className="flex-col w-full">
            <div className="flex w-full">
              <NewCar showMyListings={onShowMyListings} />
              <div className="w-4/12">
                <Background className="flex flex-col justify-start items-center w-full h-min p-6 shadow-inner">
                  <div className="flex flex-row justify-between w-full p-1">
                    <span className="topic text-2xl font-bold text-[#274C77]">
                      Seller Details
                    </span>
                  </div>
                  <div className="flex flex-row justify-between w-full p-1 text-justify my-2">
                    <p>
                      * These are the contact details which will be shown to the
                      customers
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span className="font-semibold">
                      Name: {sellar.fullname}
                    </span>
                    <span className="font-semibold">
                      e-mail: {sellar.email}
                    </span>
                    <span className="font-semibold">
                      phone number: {sellar.contactNo}
                    </span>
                  </div>
                </Background>
              </div>
            </div>

            {/* <div className="flex flex-row justify-center items-center w-full h-full">
              <div className="flex flex-row justify-between w-full p-1">
                <span className="topic text-2xl font-bold text-[#274C77]">
                  Seller Details
                </span>
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
}

export default MyListings;
