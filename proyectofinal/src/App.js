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



  //--------Cart--------
  const [cart, setCart] = useState([]);

  const addtocart = (item, cuantity) => {
    let found = false
    let index
    let objeto = item


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
            console.log(res)
            setCart([])
          })
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


  console.log(cart)
  return (
    <>
      <BrowserRouter>

        <Login login={login} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={user} mensaje={mensaje} />

        <Header isLoggedIn={isLoggedIn} />

        <Route exact path="/home">
          <HomeBody isLoggedIn={isLoggedIn} username={user} />
        </Route>

        <Route exact path="/shop">
          <ShopBody isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/shop/:id" >
          <ShopItemBody isLoggedIn={isLoggedIn} addtocart={addtocart} />
        </Route>

        <Route exact path="/cart">
          <CartBody isLoggedIn={isLoggedIn} cart={cart} buy={buy} removefromcart={removefromcart} />
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