const CartBody = ({ cart, buy, removefromcart, itemCuantity }) => {
    const showCart = cart.map((item) => {

        return (
            <div>
                <h1>{item.productName}</h1>
                <img src={item.productImg} alt="" />
                <p>{item.productDescription}</p>
                <p>{item.productPrize}€</p>
                <p>{item.cantidad}</p>
                <button onClick={() => { removefromcart(item) }}>Delete</button>
            </div>
        )

    })
    if (cart.length === 0) {
        return (
            <div>
                <p>Your cart is empty</p>
            </div>
        )
    } else {
        return (
            <div>
                {showCart}
                
                <button onClick={() => { buy(cart) }}>Buy</button>
            </div>

        )
    }

}

export default CartBody