import './App.css';
import { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom"

import Login from "./Login"
import Header from "./Header"
import Footer from "./Footer"
import HomeBody from "./HomeBody"
import ShopBody from "./ShopBody"
import PlacestogoBody from "./PlacestogoBody"
import Register from "./Register"

function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setLoggedIn] = useState(false)

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
          setUser(res.arrayUser)
          setLoggedIn(true)
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
        setUser(username)
        setLoggedIn(true)
      })
    }
  }


  return (
    <>
      <BrowserRouter>

        <Header isLoggedIn={isLoggedIn} />

        <Login login={login} isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} username={user} />

        <Route exact path="/home">
          <HomeBody isLoggedIn={isLoggedIn} username={user} />
        </Route>

        <Route exact path="/shop">
          <ShopBody isLoggedIn={isLoggedIn} />
        </Route>

        <Route exact path="/placestogo">
          <PlacestogoBody isLoggedIn={isLoggedIn} />
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