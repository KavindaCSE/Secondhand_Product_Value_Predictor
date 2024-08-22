import React from "react";
import Background from "./Background";
import "./components.css";

function ContactSeller({ onContactSeller }) {
  console.log(onContactSeller);
  return (
    <Background className="contact-seller">
      <div className="">
        <span className="">{onContactSeller.firstname}</span>
        <span className="">{onContactSeller.lastname}</span>
        <span className="">{onContactSeller.email}</span>
      </div>
    </Background>
  );
}

export default ContactSeller;
