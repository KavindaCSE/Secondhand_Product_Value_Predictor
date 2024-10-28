import React, { useState,useEffect } from "react";
import axios from "axios";
import Background from "../Components/Background";
import AdvertisementBrowser from "../Components/AdvertisementBrowser";
import ContactSeller from "../Components/ContactSeller";


function BrowseCars() {
  const [listOfCars, setListOfCars] = useState([]);// Using AdvertisementData for initial data
  const [sellerData, setSellerData] = useState(null); // No seller data initially
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [pageRange, setPageRange] = useState({ start: 0, end: 10 }); // State for pagination range

  
  useEffect(() => {
    // Fetch the list of cars from the API
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/vehicles");
        console.log(response.data)
        setListOfCars(response.data); // Assuming response contains car data
      } catch (error) {
        console.error("Error fetching the car list:", error);
      }
    };

    fetchCars();
  }, []);
  
  
  // Filter the cars based on the search term and sold status
  const filteredCars = listOfCars.filter(
    (car) =>
      !car.sold && // Exclude cars that are sold
      `${car.brand} ${car.model} ${car.location}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get current cars after filtering and pagination
  const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page change
    setPageRange({ start: 0, end: 10 }); // Reset page range
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
    setPageRange({ start: 0, end: 10 }); // Reset page range
  };

  // Fetch seller data and show the modal
  const fetchSeller = async (sellerId) => {
    // Simulated fetching of seller data
    console.log(sellerId)
    const response = await axios.get(`http://127.0.0.1:8000/api/get_user/${sellerId}`)

    const sellerData = {
      name: response.data.fullname,
      contact: response.data.contactNo,
      email: response.data.email,
    };
    setSellerData(sellerData);
    setIsModalVisible(true); // Show the modal when fetching seller data
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Handle "Next" button click for pagination
  const handleNextPageRange = () => {
    if (pageRange.end < totalPages) {
      setPageRange((prevRange) => ({
        start: prevRange.start + 10,
        end: Math.min(prevRange.end + 10, totalPages),
      }));
    }
  };

  // Handle "Previous" button click for pagination
  const handlePreviousPageRange = () => {
    if (pageRange.start > 0) {
      setPageRange((prevRange) => ({
        start: prevRange.start - 10,
        end: prevRange.start,
      }));
    }
  };

  return (
    <div className="flex flex-row justify-center items-start w-full h-vh gap-5">
      <Background className="flex flex-col justify-start items-center w-full h-full gap-[10px] p-6 bg-white">
        <div className="flex flex-row justify-start w-full p-1">
          <span className="topic text-2xl font-bold text-[#274C77]">
            Browse Cars
          </span>
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
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>

        {/* Listings */}
        <div className="w-full grid grid-cols-5 gap-3">
          {currentCars.length > 0 ? (
            currentCars.map((ad, index) => (
              <AdvertisementBrowser
                key={index}
                brand={ad.brand}
                model={ad.model}
                year={ad.year}
                transmission={ad.transmission}
                odometer={ad.odometer}
                price={ad.price}
                fuel={ad.fuel}
                image={ad.image}
                sellerId={ad.sellerId}
                onSellerDetails={(sellerId) => fetchSeller(sellerId)}
              />
            ))
          ) : (
            <div className="col-span-5 text-center">No results found</div>
          )}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center items-center mt-4">
          {pageRange.start > 0 && (
            <button
              onClick={handlePreviousPageRange}
              className="px-3 py-1 mx-1 bg-gray-300 rounded-md"
            >
              Previous
            </button>
          )}
          {Array.from(
            { length: Math.min(totalPages, pageRange.end) - pageRange.start },
            (_, index) => (
              <button
                key={pageRange.start + index}
                onClick={() => handlePageChange(pageRange.start + index + 1)}
                className={`px-3 py-1 mx-1 ${
                  currentPage === pageRange.start + index + 1
                    ? "bg-[#274C77] text-white"
                    : "bg-gray-200 text-black"
                } rounded-md`}
              >
                {pageRange.start + index + 1}
              </button>
            )
          )}
          {pageRange.end < totalPages && (
            <button
              onClick={handleNextPageRange}
              className="px-3 py-1 mx-1 bg-gray-300 rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </Background>

      {/* Modal for Seller Details */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/3 p-6 rounded-md relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-4 text-red-600 hover:text-red-900 text-2xl"
            >
              &times;
            </button>
            {/* Seller Details */}
            <ContactSeller onContactSeller={sellerData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowseCars;
