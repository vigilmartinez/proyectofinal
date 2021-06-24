import { useState } from "react";
import { Link } from "react-router-dom"

import logo from "./imgs/theotherside3.png"

import { Button, Dropdown } from 'react-bootstrap'

import "./Login.css"

const Login = ({ login, isLoggedIn, setLoggedIn, username, mensaje, setMensaje, setDuplicate }) => {
  const [client, setClient] = useState("")
  const [password, setPassword] = useState("")

  const logout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user")
      localStorage.removeItem("loggedIn")
      setLoggedIn(false)
      setClient("")
      setPassword("")
      setDuplicate(false)
      setMensaje("")
    }
  }

  if (isLoggedIn && username.admin === undefined) {
    return (
      <div className="loginBackground">
        <div className="Login">
          <div>
            <img src={logo} alt="" className="logo" />
          </div>
          <Dropdown>
            <Dropdown.Toggle className="dropdownToggle">
              <p className="dropdownText">Hello {username.username}</p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item><Link to="/cart" className="linkNoDecoration">Cart</Link></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    )
  } else if (isLoggedIn && username.admin) {
    return (
      <div className="loginBackground">
        <div className="Login">
          <div>
            <img src={logo} alt="" className="logo" />
          </div>
          <Dropdown>
            <Dropdown.Toggle className="dropdownToggle">
              <p className="dropdownText">Hello {username.username}</p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item><Link to="/stats" className="linkNoDecoration">Stats</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/cart" className="linkNoDecoration">Cart</Link></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

    )
  } else {
    return (
      <div className="loginBackground">
        <div className="Login">
          <div>
            <img src={logo} alt="" className="logo" />
          </div>


          <div>
            <div className="loginInputs">
              <input type="text" value={client} placeholder="Username" onChange={(e) => setClient(e.target.value)} />
              <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>


            <div className="lognreg">
              <div className="msgLogin">
                <p>{mensaje}</p>
              </div>
              <div className="lognreg">
                <div>
                  <Button variant="link" size="sm" onClick={() => { login(client, password) }} className="linkNoDecorationLogin">Login</Button>
                </div>

                <div>
                  |
              </div>

                <div>
                  <Button variant="link" size="sm" className="linkNoDecorationLogin">
                    <Link to="/register" className="linkNoDecorationLogin">
                      Register
                  </Link>
                  </Button>
                </div>
              </div>

            </div>



          </div>




        </div>
      </div>
    )
  }
}

export default Login