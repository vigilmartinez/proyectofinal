import { Link } from "react-router-dom"

import { Card } from "react-bootstrap"

const ShopBody = (props) => {
    const showShopItems = props.shopItems.map((item) => {
        return (
          <div>
            <Link to={`/shop/${item._id}`}>
              <Card style={{ width: '18rem' }} >
                <Card.Body>
                  <Card.Title>
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
