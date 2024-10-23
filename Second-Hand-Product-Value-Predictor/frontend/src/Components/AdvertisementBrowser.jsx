import React from "react";
import "./components.css";
import Background from "./Background";

export default function AdvertisementBrowser({
  brand,
  model,
  year,
  price,
  transmission,
  odometer,
  fuel,
  image,
  onSellerDetails,
  sellerId
})

{


  console.log(sellerId)

  return (
    <Background className="advertisement bg-gray-200">
      <img
        src={image}
        alt={`${brand} ${model}`}
        style={{ width: "250px", height: "250px", objectFit: "cover" }}
      />

      <div className="details">
        <div className="car-name">{`${year} ${brand} ${model}`}</div>
        <p className="car-features">{`${odometer} | ${fuel} | ${transmission}`}</p>
        <div className="car-price">${price}</div>
      </div>

      <div className="w-full px-4 py-2">
        <button className="cont-seller-but" onClick={() => onSellerDetails(sellerId)}>
          Contact Seller
        </button>
      </div>
    </Background>
  );
}
