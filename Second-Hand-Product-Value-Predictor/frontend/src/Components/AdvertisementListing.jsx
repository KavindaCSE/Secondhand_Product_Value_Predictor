import React, { useState } from "react";
import "./components.css";
import Background from "./Background";

export default function AdvertisementListing({
  brand,
  model,
  year,
  price,
  transmission,
  odometer,
  fuel,
  image,
  sold: initialSold,
  onDelete,
}) {
  const [sold, setSold] = useState(initialSold);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const toggleSoldStatus = () => {
    setSold(!sold);
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setIsDeleteModalVisible(false);
    onDelete();
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <>
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

        <div className="w-full px-4 py-2 flex gap-2">
          <button
            className="btn sold-btn"
            onClick={toggleSoldStatus}
            data-testid="toggle-sold"
          >
            {sold ? "Sold" : "Not Sold"}
          </button>

          <button
            className="btn delete-btn"
            onClick={handleDelete}
            data-testid="delete-btn"
          >
            Delete
          </button>
        </div>
      </Background>

      {isDeleteModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-1/3 p-6 rounded-md relative">
            <h3 className="text-lg font-bold mb-4 text-center">Delete Item</h3>
            <p className="text-center">
              Are you sure you want to permanently delete this item?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                className="btn delete-btn"
                onClick={confirmDelete}
                data-testid="confirm-delete"
              >
                Delete
              </button>
              <button
                className="btn cancel-btn"
                onClick={cancelDelete}
                data-testid="cancel-delete"
                autoFocus
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
