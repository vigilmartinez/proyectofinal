import { useState } from "react";
import { Redirect } from "react-router-dom"

import { Button, Form } from 'react-bootstrap'

import "./Register.css"

const Register = ({ register, registered, setRegistered, isLoggedIn, duplicate, randomImg, randomName }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  setRegistered(false)

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  if (registered) {
    return <Redirect to="/registered" />
  }

  if (duplicate) {
    return (
      <div className="Register">
        <div className="registerForm">
          <div>
            <h1>Register</h1>
          </div>
          <div>
            <Form className="registerForm">
              <Form.Group controlId="formBasicText">
                <div className="registerUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <div className="registerUsername">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
              </Form.Group>
              <div>
                <p>Username already taken</p>
              </div>
              <div className="registerButton">
                <Button variant="dark" size="sm" onClick={() => { register(username, password) }}>Submit</Button>
              </div>
            </Form>
          </div>
        </div>

        <div>
          <img src={randomImg} alt="" className="registerImg" />
          <p className="registerImgText">{randomName}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="Register">
        <div className="registerForm">
          <div>
            <h1>Register</h1>
          </div>
          <div>
            <Form className="registerForm">
              <Form.Group controlId="formBasicText">
                <div className="registerUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </div>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <div className="registerUsername">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
              </Form.Group>
              <div className="registerButton">
                <Button variant="dark" size="sm" onClick={() => { register(username, password) }}>Submit</Button>
              </div>
            </Form>
          </div>
        </div>

        <div>
          <img src={randomImg} alt="" className="registerImg" />
          <p className="registerImgText">{randomName}</p>
        </div>
      </div >
    )
  }

}

export default Register;