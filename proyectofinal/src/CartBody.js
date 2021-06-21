import { useState, useEffect } from "react"

import { Button } from 'react-bootstrap';

import "./CartBody.css";

const CartBody = ({ cart, buy, removefromcart }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart.length !== 0) {
            let precioTotal = 0;
            let sumaPrecio;

            for (let i = 0; i < cart.length; i++) {
                sumaPrecio = parseFloat(cart[i].productPrize) * cart[i].cantidad;

                precioTotal += sumaPrecio;
            }
            setTotal(precioTotal)
        }
    }, [cart])

    const showCart = cart.map((item) => {
        return (
            <div className="cartItem">
                <div>
                    <img src={item.productImg} alt="" />
                </div>
                <div className="cartItemText">
                    <h1>{item.productName}</h1>
                    <p>{item.productDescription}</p>
                    <p>{item.productPrize}€</p>
                    <p>Quantity: {item.cantidad}</p>
                    <Button variant="contained" className="cartItemButton" onClick={() => { removefromcart(item) }}>Delete</Button>
                </div>

            </div>
        )
    })


    if (cart.length === 0) {
        return (
            <div className="cartItemBody">
                <p>Your cart is empty</p>
            </div>
        )
    } else {
        return (
            <div className="cartItemBody">
                <div>
                    {showCart}
                </div>
                <div>
                    <p>Total: {total}€</p>
                </div>
                <Button variant="contained" className="cartItemBuyButton" size="bg" onClick={() => { buy(cart) }}>Buy</Button>
            </div>

        )
    }

}

export default CartBody