import React from "react";
import "./components.css";
import Background from "./Background";
// import { useState } from "react";

export default function Advertisement({
    brand,
    model,
    year,
    price,
    title_status,
    odometer,
    fuel,
    image,
    onSellerDetails,
    browseCars
}) 

{
  
  let handleClick = () => {
    console.log("Sold")
  }

  return (
    <Background className="advertisement">
      <img src={image} alt="Car" />
      <div className="details">
        <div className="car-name">{`${year} ${brand} ${model}`}</div>
        <p className="car-features">{`${odometer} | ${fuel} | ${title_status}`}</p>
        <div className="car-price">${price}</div>
      </div>
      {browseCars ? (
        <div className="w-full px-4 py-2">
          <button className="cont-seller-but" onClick={onSellerDetails}>
            Contact Seller
          </button>
        </div>
      ) : (
        <div className="w-full px-4 py-2">
          <button className="cont-seller-but" onClick={handleClick}>Mark as Sold</button>
        </div>
      )}
    </Background>
  );
}
