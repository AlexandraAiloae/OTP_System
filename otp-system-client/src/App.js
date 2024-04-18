import React, { useState } from "react";
import Registration from "./components/Registration";
import Authentication from "./components/Authentication";

function App() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };

  return (
    <div>
      {!registrationSuccess && (
        <Registration onSuccess={handleRegistrationSuccess} />
      )}
      {registrationSuccess && <Authentication />}
    </div>
  );
}

export default App;
