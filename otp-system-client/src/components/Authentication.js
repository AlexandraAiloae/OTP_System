import React, { useState, useEffect } from "react";
import axios from "axios";
import OTPValidation from "./OtpValidation";
import CustomPopup from "./CustomPopup";
import "./Authentication.css";

const Authentication = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [decryptedOTP, setDecryptedOTP] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [savedUsername, setSavedUsername] = useState("");
  const [authenticationError, setAuthenticationError] = useState("");

  useEffect(() => {
    let intervalId;
    if (showPopup && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setShowPopup(false);
    }

    return () => clearInterval(intervalId);
  }, [showPopup, remainingTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7187/api/User/authenticate",
        {
          username,
          password,
        }
      );

      const encodedOTP = response.data.totpSecret;
      const decryptedResult = decrypt(encodedOTP, "ThisIsMyEncryptionKey");
      setDecryptedOTP(decryptedResult);

      setSavedUsername(username);
      setRemainingTime(30);
      setShowPopup(true);
    } catch (error) {
      console.error("Authentication failed:", error);
      setAuthenticationError(
        "Authentication failed. Please check your credentials."
      );
    }
  };

  const decrypt = (input, key) => {
    let result = "";
    for (let i = 0; i < input.length; i++)
      result += String.fromCharCode(
        input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    return result;
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <h2>Authenticate</h2>
      {authenticationError && (
        <p className="error-message">{authenticationError}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Authenticate</button>
      </form>

      {showPopup && (
        <CustomPopup
          decryptedOTP={decryptedOTP}
          remainingTime={remainingTime}
          onClose={handleClosePopup}
        />
      )}

      {savedUsername && <OTPValidation savedUsername={savedUsername} />}
    </div>
  );
};

export default Authentication;
