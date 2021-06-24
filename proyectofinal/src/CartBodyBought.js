import { useState} from "react"
import { Redirect } from "react-router-dom"


import "./CartBody.css";

const CartBodyBought = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [second, setSecond] = useState(2);

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
        <div className="cartItemBody">
            <div className="cartItem">
                <div>
                    <h1>Thank You for your purchase</h1>
                </div>
            </div>
        </div>
    )
}

export default CartBodyBought