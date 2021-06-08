import { useState } from "react";
import { Link } from "react-router-dom"

import { Button } from 'react-bootstrap'

const Login = ({ login, isLoggedIn, setLoggedIn, username }) => {
  const [client, setClient] = useState("")
  const [password, setPassword] = useState("")

  const logout = () => {
    if (isLoggedIn) {
      setLoggedIn(false)
      setClient("")
      setPassword("")
    }
  }

  if (isLoggedIn) {
    return (
      <>
        <div>
          <p>Henlo {username}</p>
          <Button variant="link" size="sm" onClick={logout}>Logout</Button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <input type="text" value={client} onChange={(e) => setClient(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="link" size="sm" onClick={() => { login(client, password) }} >Login</Button>
        </div>
        <div>
          <Link to="/register" >
            <h3>Register</h3>
          </Link>
        </div>
      </ >
    )
  }
}

export default Login