import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { Button } from 'react-bootstrap'

const ShopItemBody = ({ shopItems, addtocart }) => {
    const [item, setItem] = useState([{}]);
    let { id } = useParams(shopItems._id);

    useEffect(() => {
        fetch(`/shop/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setItem(res)
                console.log(res)
            })
    }, [id]);

    return (
        <div>
            <h1>{item[0].productName}</h1>
            <img src={item[0].productImg} alt="" />
            <p>{item[0].productDescription}</p>
            <p>{item[0].productPrize}€</p>
            <Button variant="primary" size="sm" onClick={() => { addtocart(item) }}>Add to Cart</Button>
        </div>
    )
};

export default ShopItemBody;