import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button } from 'react-bootstrap';

import "./shopItemBody.css";

const ShopItemBody = ({ addtocart, added, setAdded }) => {
    const [cuantity, setCuantity] = useState(1);
    const [item, setItem] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        fetch(`/shop/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setItem(res)
            })
    }, [id]);


    const subs = () => {
        if (cuantity > 1) {
            setCuantity(cuantity - 1)
        }
    }

    const add = () => {
        setCuantity(cuantity + 1)
    }



    const showItem = item.map(item => {
        return (
            <div className="shopItem">
                <div>
                    <img src={item.productImg} alt="" />
                </div>
                <div className="shopItemText">

                    <div>
                        <h1>{item.productName}</h1>
                        <p>{item.productDescription}</p>
                        <p>{item.productPrize}€</p>
                    </div>

                    <div className="plusminus">
                        <Button variant="contained" className="shopItemButton" size="sm" onClick={() => { subs() }}>-</Button>
                        <p className="shopItemCuantity">{cuantity}</p>
                        <Button variant="contained" className="shopItemButton" size="sm" onClick={() => { add() }}>+</Button>
                    </div>
                    <div>
                        <Button variant="contained" className="shopItemBuyButton" size="bg" onClick={() => { addtocart(item, cuantity); setCuantity(1); setAdded(false) }}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        )
    })


    if (added) {
        return (
            <div className="shopItemBody">
                {showItem}
                <p>Correctly Added</p>
            </div>
        )
    } else {
        return (
            <div className="shopItemBody">
                <div>
                    {showItem}
                </div>
            </div>
        )
    }


};

export default ShopItemBody;