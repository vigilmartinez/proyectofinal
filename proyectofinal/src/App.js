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
import PlacestogoBody from "./PlacestogoBody"
import Register from "./Register"

function App() {
  //--------Login & Register--------
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [mensaje, setMensaje] = useState("");

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
          login(username, password)
        })
    }
  }



  //--------Shop--------
  const [shopItems, setShopItems] = useState([])

  useEffect(() => {
    fetch("/shop")
      .then((res) => res.json())
      .then((res) => {
        setShopItems(res)
      })
  }, [])



  //--------Cart--------
  const [cart, setCart] = useState([])

  const addtocart = (item) => {
    setCart([...cart, item[0]]);
  }

  const buy = (cart) => {
    fetch("/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cart })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setCart([])
      })
  }




  //--------Places--------
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetch("/placestogo")
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res)
      })
  }, [])



  return (
    <>
      <BrowserRouter>

        <Login login={login} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={user} mensaje={mensaje} />

        <Header isLoggedIn={isLoggedIn} />

        <Route exact path="/home">
          <HomeBody isLoggedIn={isLoggedIn} username={user} />
        </Route>

        <Route exact path="/shop">
          <ShopBody isLoggedIn={isLoggedIn} shopItems={shopItems} />
        </Route>
        <Route exact path="/shop/:id" >
          <ShopItemBody isLoggedIn={isLoggedIn} shopItems={shopItems} addtocart={addtocart} />
        </Route>

        <Route exact path="/cart">
          <CartBody isLoggedIn={isLoggedIn} cart={cart} buy={buy} />
        </Route>

        <Route exact path="/placestogo">
          <PlacestogoBody isLoggedIn={isLoggedIn} places={places} />
        </Route>

        <Route exact path="/register">
          <Register register={register} isLoggedIn={isLoggedIn} />
        </Route>

        <Footer />

      </BrowserRouter>
    </>
  );
}

export default App;