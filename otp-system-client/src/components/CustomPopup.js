import React from "react";
import "./CustomPopup.css";

const CustomPopup = ({ decryptedOTP, remainingTime, onClose }) => {
  return (
    <div className="custom-popup">
      <div className="custom-popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>OTP Information</h3>
        <p>Decrypted OTP: {decryptedOTP}</p>
        <p>Remaining Time: {remainingTime} seconds</p>
      </div>
    </div>
  );
};

export default CustomPopup;
