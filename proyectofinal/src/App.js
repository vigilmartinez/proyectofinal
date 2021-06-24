import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom"


import Login from "./Login"
import Header from "./Header"
import Footer from "./Footer"
import HomeBody from "./HomeBody"
import ShopBody from "./ShopBody"
import ShopItemBody from "./ShopItemBody"
import CartBody from "./CartBody"
import CartBodyBought from "./CartBodyBought"
import PlacestogoBody from "./PlacestogoBody"
import Register from "./Register"
import Registered from "./Registered"
import Stats from "./Stats"

function App() {

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [isLoggedIn, setLoggedIn] = useState(() => JSON.parse(localStorage.getItem("loggedIn")) || false);
  const [registered, setRegistered] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [shopItems, setShopItems] = useState([]);

  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [bought, setBought] = useState(false);

  const [added, setAdded] = useState(false);
  
  const [places, setPlaces] = useState([]);
  const [duplicate, setDuplicate] = useState();
  const [randomImg, setRandomImg] = useState(0)
  const [randomName, setRandomName] = useState("")

  const [url, setUrl] = useState(window.location.href)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  //--------Login & Register--------
  const login = (username, password) => {
    if (username !== "") {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error === false) {
            localStorage.setItem("user", JSON.stringify(res.username))
            localStorage.setItem("loggedIn", JSON.stringify(true))
            setUser(res.username)
            setLoggedIn(true)
          } else {
            setMensaje(res.message)
          }
        })
    }
  }

  const register = (username, password) => {
    if (username !== "") {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message)
          if (!res.duplicate) {
            login(username, password)
            setDuplicate(false)
            setRegistered(true)
          } else {
            setDuplicate(res.duplicate)
          }
        })
    }
  }


  //--------Shop--------

  useEffect(() => {
    fetch("/shop")
      .then((res) => res.json())
      .then((res) => {
        setShopItems(res)
      })
  }, [])


  //--------Cart--------


  const addtocart = (item, cuantity) => {
    let found = false
    let index
    let objeto = item

    console.log(cuantity)
    const array = cart.slice()

    objeto.cantidad = cuantity
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === item._id) {
        found = true
        index = i
        break
      }
    }

    if (found) {
      array[index].cantidad += cuantity
    } else {
      array.push(item)
    }
    localStorage.setItem("cart", JSON.stringify(array))
    setAdded(true)
    setCart(array)
  }


  const removefromcart = (item) => {
    const array = cart.filter((product) => {
      if (item.productName !== product.productName) {
        return true
      } else {
        return false
      }
    })
    setCart(array)
    localStorage.setItem("cart", JSON.stringify(array))
  }


  const buy = (cart) => {
    fetch("/sales")
      .then((res) => res.json())
      .then((res) => {
        fetch("/sales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ cart })
        })
          .then((res) => res.json())
          .then((res) => {
            setCart([])
            setBought(true)
          })
      })
  }



  //--------Places--------


  useEffect(() => {
    fetch("/placestogo")
      .then((res) => res.json())
      .then((res) => {
        const random = Math.floor(Math.random() * (res.length - 0)) + 0
        setPlaces(res)
        setRandomImg(res[random].placeImg)
        setRandomName(res[random].placeTitle)
      })
  }, [])




  return (
    <div className="appBackground">
      <div className="app">

        <BrowserRouter>

          <div className="appHeader">
            <div className="appItems">
              <Login login={login} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={user} mensaje={mensaje} setMensaje={setMensaje} setDuplicate={setDuplicate} />

              <Header isLoggedIn={isLoggedIn} url={url} />
            </div>
          </div>

          <div className="appBody">
            <div className="appItems">

              <Route exact path="/">
                <HomeBody isLoggedIn={isLoggedIn} username={user} shopItems={shopItems} randomImg={randomImg} randomName={randomName} />
              </Route>

              <Route exact path="/shop">
                <ShopBody isLoggedIn={isLoggedIn} setAdded={setAdded} shopItems={shopItems} />
              </Route>
              <Route exact path="/shop/:id" >
                <ShopItemBody isLoggedIn={isLoggedIn} addtocart={addtocart} added={added} setAdded={setAdded} />
              </Route>

              <Route exact path="/cart">
                <CartBody isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} buy={buy} bought={bought} setBought={setBought} removefromcart={removefromcart} />
              </Route>
              <Route exact path="/purchase">
                <CartBodyBought isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} buy={buy} removefromcart={removefromcart} />
              </Route>

              <Route exact path="/stats">
                <Stats isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} buy={buy} removefromcart={removefromcart} />
              </Route>

              <Route exact path="/placestogo">
                <PlacestogoBody isLoggedIn={isLoggedIn} places={places} />
              </Route>

              <Route exact path="/register">
                <Register register={register} registered={registered} setRegistered={setRegistered} isLoggedIn={isLoggedIn} duplicate={duplicate} randomImg={randomImg} randomName={randomName} />
              </Route>

              <Route exact path="/registered">
                <Registered register={register} isLoggedIn={isLoggedIn} duplicate={duplicate} randomImg={randomImg} randomName={randomName} />
              </Route>

            </div>
          </div>


          <div className="appFooter">
            <div className="appItems">
              <Footer />
            </div>
          </div>

        </BrowserRouter>
      </div>
    </div>

  );
}

export default App;