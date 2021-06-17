import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

import { Button } from 'react-bootstrap'

const ShopItemBody = ({ shopItems, addtocart }) => {
    const [cuantity, setCuantity] = useState(1);
    const [item, setItem] = useState([]);

    let { id } = useParams();

    const subs = () => {
        if (cuantity > 1) {
            setCuantity(cuantity - 1)
        }
    }

    const add = () => {
        setCuantity(cuantity + 1)
    }



    const added = () => {
        return (
            <div>
                <p>Added Correctly</p>
            </div>
        )
    }



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
            <div>
                {item.map(item => {
                    return (
                        <>
                            <h1>{item.productName}</h1>
                            <img src={item.productImg} alt="" />
                            <p>{item.productDescription}</p>
                            <p>{item.productPrize}€</p>
                        </>
                    )
                })}

            </div>
            <div>
                <Button variant="primary" size="sm" onClick={() => { subs() }}>-</Button>
                <p>{cuantity}</p>
                <Button variant="primary" size="sm" onClick={() => { add() }}>+</Button>
            </div>
            <div>
                <Button variant="primary" size="bg" onClick={() => { addtocart(item[0], cuantity) }}>Add to Cart</Button>
            </div>
            {added()}
        </div>
    )
};

export default ShopItemBody;