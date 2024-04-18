import React, { useState } from "react";
import axios from "axios";
import "./OtpValidation.css";

const OTPValidation = ({ savedUsername }) => {
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const encryptedEnteredOTP = encrypt(otp, "ThisIsMyEncryptionKey");

      const response = await axios.post(
        "https://localhost:7187/api/User/validateotp",
        {
          username: savedUsername,
          otp: encryptedEnteredOTP,
        }
      );
      setMessage("OTP validation successful");
      setOTP("");
    } catch (error) {
      console.error("OTP validation failed:", error);
      setMessage("OTP validation failed. Please try again.");
    }
  };

  const encrypt = (input, key) => {
    let result = "";
    for (let i = 0; i < input.length; i++)
      result += String.fromCharCode(
        input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    return result;
  };

  return (
    <div className="validation-container">
      <h2>OTP Validation</h2>
      {message && (
        <p
          className={`message ${
            message.includes("failed") ? "error-message" : "success-message"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <button type="submit">Validate OTP</button>
      </form>
    </div>
  );
};

export default OTPValidation;
