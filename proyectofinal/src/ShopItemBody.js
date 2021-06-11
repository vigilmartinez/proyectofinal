import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const ShopItemBody = () => {
    const [product, setProduct] = useState({});
    let { id } = useParams();

    useEffect(() => {
        fetch(`/shop/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setProduct(res)
                console.log(res)
            })
    }, [id]);



    return (
        <div>
            <h1>{product.productName}</h1>
        </div>
    )
};

export default ShopItemBody;