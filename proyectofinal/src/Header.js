

import "./Header.css"


const Header = ({ url }) => {

  if (url === "http://localhost:3000/") {
    return (
      <div>
        
        <div className="Header">
          <div>
            <a href="/" className="linkNoDecorationHeader">
              <h2 className="underscore">Home</h2>
            </a>
          </div>
          <div>
            <a href="/shop" className="linkNoDecorationHeader">
              <h2>Shop</h2>
            </a>
          </div>
          <div>
            <a href="/placestogo" className="linkNoDecorationHeader">
              <h2>Places to go</h2>
            </a>
          </div>
        </div>
      </div>
    )
  } else if (url === "http://localhost:3000/shop") {
    return (
      <div>
        
        <div className="Header">
          <div>
            <a href="/" className="linkNoDecorationHeader">
              <h2>Home</h2>
            </a>
          </div>
          <div>
            <a href="/shop" className="linkNoDecorationHeader">
              <h2 className="underscore">Shop</h2>
            </a>
          </div>
          <div>
            <a href="/placestogo" className="linkNoDecorationHeader">
              <h2>Places to go</h2>
            </a>
          </div>
        </div>
      </div>

    )
  } else if (url === "http://localhost:3000/placestogo") {
    return (
      <div>
        
        <div className="Header">
          <div>
            <a href="/" className="linkNoDecorationHeader">
              <h2>Home</h2>
            </a>
          </div>
          <div>
            <a href="/shop" className="linkNoDecorationHeader">
              <h2>Shop</h2>
            </a>
          </div>
          <div>
            <a href="/placestogo" className="linkNoDecorationHeader">
              <h2 className="underscore">Places to go</h2>
            </a>
          </div>
        </div>
      </div>

    )
  } else {
    return (
      <div>
        
        <div className="Header">
          <div>
            <a href="/" className="linkNoDecorationHeader">
              <h2>Home</h2>
            </a>
          </div>
          <div>
            <a href="/shop" className="linkNoDecorationHeader">
              <h2>Shop</h2>
            </a>
          </div>
          <div>
            <a href="/placestogo" className="linkNoDecorationHeader">
              <h2>Places to go</h2>
            </a>
          </div>
        </div>
      </div>

    )
  }
}

export default Header