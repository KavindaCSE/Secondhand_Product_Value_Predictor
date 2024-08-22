import React,{useState,useEffect} from "react";
import "./BrowseCars.css";
import Background from "../../Components/Background";
import Advertisement from "../../Components/Advertisement";
import image from "../../assets/car.png";
import ContactSeller from "../../Components/ContactSeller";
import axios from 'axios';


function BrowseCars() {
  let[listOfCars,setlistOfCars] = useState([])
  let[sellerData,setsellerData] = useState([])
  
  let id  = '01234'


  useEffect(() => {
    
    let fetchData = async () => {
      let {data:listOfCars} = await axios.get(`http://127.0.0.1:8000/vehicles`)
      setlistOfCars(listOfCars)
    }

    fetchData()

  },[])

  let fetchSeller = async(id) => {
    let {data:sellerData} = await axios.get(`http://127.0.0.1:8000/get_user/${id}`)
    setsellerData(sellerData)
  }

  return (
    <div className="browsecar">
      <Background className="car-gallery">
        <div className="flex flex-row justify-start w-full p-1">
          <span className="topic">Browse Cars</span>
        </div>
        <div className="w-full">
          <input
            type="text"
            className="input-field"
            placeholder="Search Here"
          />
        </div>
        <div className="grid-container">
          {listOfCars.map((ad) => (
            <Advertisement
              key={ad.id}
              brand={ad.brand}
              model={ad.model}
              year={ad.year}
              price={ad.price}
              location={ad.location}
              mileage={ad.mileage}
              fuel={ad.fuel}
              image={image}
              onSellerDetails={() => fetchSeller(ad.user_id)}
              browseCars={true}
            />
          ))}
        </div>
      </Background>
      <div className="filter-contactseller">
        <Background className="filter">
          <div className="">
            {sellerData && (
              <div>
                <ContactSeller onContactSeller={sellerData} />
              </div>
            )}
            {!sellerData && <div>No Seller Details</div>}
          </div>
        </Background>
      </div>
    </div>
  );
}

export default BrowseCars;
