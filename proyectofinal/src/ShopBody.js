import { Link } from "react-router-dom"

import { Card } from "react-bootstrap"

import "./ShopBody.css"

const ShopBody = ({ shopItems, setAdded }) => {
  setAdded(false)

  const showShopItems = shopItems.map((item) => {
    return (
      <div >
        <Link to={`/shop/${item._id}`} className="cardText">
          <Card className="shopCard">
            <Card.Body>
              <Card.Title >
                {item.productName}
              </Card.Title>
            </Card.Body>
            <Card.Img variant="top" src={item.productImg} width="18rem" />
          </Card>
        </Link>
      </div>
    )
  })

  return (
    <div className="Shop">
      <div className="shopCards">
        {showShopItems}
      </div>
    </div>
  )
}

export default ShopBody;
