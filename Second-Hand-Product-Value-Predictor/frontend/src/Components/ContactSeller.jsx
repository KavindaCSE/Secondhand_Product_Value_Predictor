import React from "react";
import Background from "./Background";
import "./components.css";

function ContactSeller({ onContactSeller }) {
  return (
    <Background className="contact-seller  rounded-lg p-6 w-full max-w-md">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-[#274C77] mb-2">
          Seller Details
        </h2>
        <p className="text-gray-500">Get in touch with the seller</p>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-gray-700">Name:</span>
          <span className="text-lg text-gray-900">{onContactSeller.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-gray-700">Contact:</span>
          <span className="text-lg text-gray-900">
            {onContactSeller.contact}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-gray-700">Email:</span>
          <span className="text-lg text-gray-900">{onContactSeller.email}</span>
        </div>
      </div>
    </Background>
  );
}

export default ContactSeller;
