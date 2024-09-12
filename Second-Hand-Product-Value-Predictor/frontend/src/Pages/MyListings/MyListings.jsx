import React,{useState,useEffect} from "react";
import "./MyListings.css";
import Background from "../../Components/Background";
import Advertisement from "../../Components/Advertisement";
import image from "../../assets/car.png";
import axios from 'axios';
import NewCar from "../../Components/NewCar";


function MyListings() {

  let[listOfCars,setlistOfCars] = useState([])
  const [showNewCar, setShowNewCar] = useState(false);

  const onShowMyListings = () => {
    setShowNewCar(false);
  };

  let id  = 1234


  useEffect(() => {
    
    let fetchData = async () => {
      let {data:listOfCars} = await axios.get(`http://127.0.0.1:8000/get-vehicles-userid/${id}`)
      setlistOfCars(listOfCars)
    }

    
    fetchData()
    
  },[])

  

  return (
    <div className="flex flex-row justify-center items-start w-full h-auto gap-5">
      {!showNewCar ? (
        <>
          <Background className="flex flex-col justify-center items-center w-full h-full gap-2">
            <div className="flex flex-row justify-between w-full p-1">
              <span className="font-lato text-[#274c77] text-[22px] font-bold">
                My Listings
              </span>
              <button
                className="px-2 py-1 bg-[#274C77] rounded-md"
                onClick={() => setShowNewCar(true)}
              >
                <span className="text-[#E6EBEE]">Add New Car</span>
              </button>
            </div>
            <div className="w-full">
              {/* <input
                type="text"
                className="rounded-lg w-full h-[35px] border border-[#274c7778] px-3"
                placeholder="Search Here"
              /> */}
            </div>
            <div className="w-full grid grid-cols-5 gap-3">
          {listOfCars.map((ad,index) => (
            <Advertisement
              key={index}
              brand={ad.brand}
              model={ad.model}
              year={ad.year}
              price={ad.price}
              title_status={ad.title_status}
              odometer={ad.odometer}
              fuel={ad.fuel}
              image={image}
              sellerDetails={ad.sellerDetails}
              browseCars={ad.sold}
            />
          ))}
        </div>
      </Background>
       {/* <div className="w-4/12">
            <Background className="flex flex-col justify-start items-center w-full h-full">
              <div>
                <span className="font-lato text-[#274c77] text-[18px] font-bold">
                  Filters
                </span>
              </div>
            </Background>
          </div> */}
        </>
      ) : (
        <>
          <NewCar showMyListings={onShowMyListings} />
          <div className="w-4/12">
            <Background className="flex flex-col justify-start items-center w-full h-full">
              <div className="flex flex-row justify-between w-full p-1">
                <span className="font-lato text-[#274c77] text-[18px] font-bold">
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
                <span className="font-semibold">Name: Verosha Kriyanjala</span>
                <span className="font-semibold">
                  e-mail: veroshakriyanjala32@gmail.com
                </span>
                <span className="font-semibold">
                  phone number: +94 70 127 2099
                </span>
              </div>
            </Background>
          </div>
        </>
      )}
    </div>
  );
}

export default MyListings;
