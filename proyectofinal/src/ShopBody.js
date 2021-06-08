import { useState, useEffect } from "react"

const ShopBody = () => {
    const [shopItems, setShopItems] = useState([])
    useEffect(() => {
        fetch("/shop")
            .then((res) => res.json())
            .then((res) => {
                setShopItems(res.shopItems)
            })
    }, [])

    const showShopItems = shopItems.map((item) => {
        return (
            <div>
                <h1>{item.productName}</h1>
                <p>{item.productDescription}</p>
                <img src={item.productImg} alt=""/>
                <p>{item.productPrize}</p>
            </div>
        )
    })
    return showShopItems
}

export default ShopBody;
