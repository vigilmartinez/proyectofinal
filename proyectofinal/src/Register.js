import { useState } from "react";
import { Redirect } from "react-router-dom"

import { Button, Form } from 'react-bootstrap'

const Register = ({ register, isLoggedIn }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  if (isLoggedIn) {
    return <Redirect to="/home" />
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="dark" size="sm" onClick={() => { register(username, password) }}>
          Submit
        </Button>
      </Form>
    </div >
  )
}

export default Register;