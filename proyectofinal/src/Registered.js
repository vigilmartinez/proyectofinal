import { useState } from "react";
import { Redirect } from "react-router-dom"

import "./Register.css"

const Registered = ({ randomImg, randomName }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [second, setSecond] = useState(1);

  // An interval that will execute every 1 second
  const fiveSecondRedirect = setInterval(() => {

    // Decrement our second variable
    // Remember it starts at 5 seconds
    setSecond(second - 1);

    // Once we hit 0 seconds
    // Let's redirect and clear the interval
    if (second === 0) {
      setShouldRedirect(true);
      clearInterval(fiveSecondRedirect);
    }
  }, 1000);

  // Redirect to the login page when `shouldRedirect` is true
  if (shouldRedirect) return <Redirect to="/" />;

  return (
    <div className="Register">
      <div className="registerForm">
        <div>
          <h1>Registered Correctly</h1>
        </div>
      </div>

      <div>
        <img src={randomImg} alt="" className="registerImg" />
        <p className="registerImgText">{randomName}</p>
      </div>
    </div>
  )
}

export default Registered;