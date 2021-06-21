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

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [isLoggedIn, setLoggedIn] = useState(() => JSON.parse(localStorage.getItem("loggedIn")) || false);
  const [mensaje, setMensaje] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [added, setAdded] = useState(false);
  const [places, setPlaces] = useState([]);
  const [duplicate, setDuplicate] = useState();

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
          } else {
            setDuplicate(res.duplicate)
          }
        })
    }
  }



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
          })
      })
  }



  //--------Places--------


  useEffect(() => {
    fetch("/placestogo")
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res)
      })
  }, [])


  return (
    <div className="app">
      <BrowserRouter>

        <Login login={login} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={user} mensaje={mensaje} setMensaje={setMensaje} setDuplicate={setDuplicate} />

        <Header isLoggedIn={isLoggedIn} />

        <Route exact path="/home">
          <HomeBody isLoggedIn={isLoggedIn} username={user} />
        </Route>

        <Route exact path="/shop">
          <ShopBody isLoggedIn={isLoggedIn} setAdded={setAdded} />
        </Route>
        <Route exact path="/shop/:id" >
          <ShopItemBody isLoggedIn={isLoggedIn} addtocart={addtocart} added={added} setAdded={setAdded} />
        </Route>

        <Route exact path="/cart">
          <CartBody isLoggedIn={isLoggedIn} cart={cart} setCart={setCart} buy={buy} removefromcart={removefromcart} />
        </Route>

        <Route exact path="/placestogo">
          <PlacestogoBody isLoggedIn={isLoggedIn} places={places} />
        </Route>

        <Route exact path="/register">
          <Register register={register} isLoggedIn={isLoggedIn} duplicate={duplicate} />
        </Route>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;