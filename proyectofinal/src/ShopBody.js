import { useState, useEffect, Link } from "react"

import { Card } from "react-bootstrap"
//<Link to={`/shop/${item._id}`}>{item.productName}</Link>

const ShopBody = () => {
    const [shopItems, setShopItems] = useState([])

    useEffect(() => {
        fetch("/shop")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setShopItems(res)
            })
    }, [])

    const showShopItems = shopItems.map((item) => {
        console.log(item._id)
        return (
            <div>

                <Card style={{ width: '18rem' }} >
                    <Card.Body>
                        <Card.Title>
                            {item.productName}
                        </Card.Title>
                    </Card.Body>
                    <Card.Img variant="top" src={item.productImg} width="18rem" />
                </Card>

            </div>
        )
    })
    return (
        <div className="Shop">
            <div>
                <h1>Shop</h1>
            </div>
            <div className="shopCards">
                {showShopItems}
            </div>
        </div>
    )
}

export default ShopBody;
