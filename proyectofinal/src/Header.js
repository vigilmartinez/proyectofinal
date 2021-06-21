import { Link } from "react-router-dom"

import { Container, Row, Col } from 'react-bootstrap';

import "./Header.css"

const Header = () => {
  return (
    <Container fluid className="Header">
      <Row>
        <Col sm={2}>
          <Link to="/home" >
            <h2>Home</h2>
          </Link>
        </Col>
        <Col sm={2}>
          <Link to="/shop" >
            <h2>Shop</h2>
          </Link>
        </Col>
        <Col sm={2}>
          <Link to="/placestogo" >
            <h2>Places to go</h2>
          </Link>
        </Col>
      </Row>
    </Container>
    /* <div >
    <div>
      
    </div>
    <div>
      
    </div>
    <div>
      
    </div>
  </div> */
  )
}

export default Header