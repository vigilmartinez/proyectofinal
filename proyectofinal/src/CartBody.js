const CartBody = ({cart, buy}) => {
    const showCart = cart.map((cart) => {

        return (
            <div>
                <h1>{cart.productName}</h1>
                <img src={cart.productImg} alt="" />
                <p>{cart.productDescription}</p>
                <p>{cart.productPrize}€</p>
            </div>
        )

    })
    return (
        <div>
            {showCart}
            <button onClick={()=> {buy(cart)}}>Buy</button>
        </div>

    )
}

export default CartBody