import { useState } from "react";
import { Link } from "react-router-dom"

import { Button, Dropdown } from 'react-bootstrap'

const Login = ({ login, isLoggedIn, setLoggedIn, username, mensaje }) => {
  const [client, setClient] = useState("")
  const [password, setPassword] = useState("")
  const logout = () => {
    if (isLoggedIn) {
      setLoggedIn(false)
      setClient("")
      setPassword("")
    }
  }

  if (isLoggedIn && username.admin === undefined) {
    return (
      <>
        <div className="Login">
          <Dropdown>
            <Dropdown.Toggle variant="Primary" id="dropdown-basic">
              Henlo {username.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item><Link to="/cart" className="linkNoDecoration">Cart</Link></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    )
  } else if (isLoggedIn && username.admin) {
    return (
      <>
        <div className="Login">
          <Dropdown>
            <Dropdown.Toggle variant="Primary" id="dropdown-basic">
              Henlo {username.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item><Link to="/cart" className="linkNoDecoration">asdasasda</Link></Dropdown.Item>
              <Dropdown.Item><Link to="/cart" className="linkNoDecoration">Cart</Link></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="Login">

          <div>
            <input type="text" value={client} onChange={(e) => setClient(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <p>{mensaje}</p>
          </div>

          <div>
            <Button variant="link" size="sm" onClick={() => { login(client, password) }} >Login</Button>
          </div>

          <div>
            |
          </div>

          <div>
            <Button variant="link" size="sm">
              <Link to="/register" >
                Register
              </Link>
            </Button>
          </div>

        </div>
      </ >
    )
  }
}

export default Login