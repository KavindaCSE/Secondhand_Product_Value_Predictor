import React from "react";
import "./components.css";
import Background from "./Background";

export default function AdvertisementBrowser({
  brand,
  model,
  year,
  price,
  location,
  mileage,
  fuel,
  image,
  onSellerDetails,
}) {
  return (
    <Background className="advertisement bg-gray-200">
      <img
        src={image}
        alt={`${brand} ${model}`}
        style={{ width: "250px", height: "250px", objectFit: "cover" }}
      />

      <div className="details">
        <div className="car-name">{`${year} ${brand} ${model}`}</div>
        <p className="car-features">{`${mileage} | ${fuel} | ${location}`}</p>
        <div className="car-price">${price}</div>
      </div>

      <div className="w-full px-4 py-2">
        <button className="cont-seller-but" onClick={onSellerDetails}>
          Contact Seller
        </button>
      </div>
    </Background>
  );
}
