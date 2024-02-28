import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { login } from '../../../../services/auth.service'

import AuthService from '../../../../../src/services/auth.service'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const { unauthorizedMessage } = useSelector((store) => store.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLoginForm = (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const user = Object.fromEntries(formData)

    const name = formData.get('username')

    // setLoading(true)
    dispatch(login(user))
    // AuthService.login(username, password).then(
    //   () => {
    //     navigate('/dashboard')
    //     window.location.reload()
    //   },
    //   (error) => {
    //     const resMessage =
    //       error.response.data.errors ||
    //       error.response.data.message ||
    //       error.message ||
    //       error.toString()

    //     setLoading(false)
    //     setMessage(resMessage)
    //   }
    // )
  }

  return (
    <form onSubmit={handleLoginForm}>
      <div className="ring mx-auto mt-5">
        <i style={{ '--clr': '#00ff0a' }}></i>
        <i style={{ '--clr': '#ff0057' }}></i>
        <i style={{ '--clr': '#fffd44' }}></i>
        {/* <form className="login" onSubmit={handleLoginForm}> */}
        <div className="login">
          <h2>Login</h2>
          {unauthorizedMessage && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {unauthorizedMessage}
              </div>
            </div>
          )}

          <div className="inputBx">
            <input
              type="text"
              placeholder="Username"
              //  value={username}
              name="username"
              //  onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputBx">
            <input
              type="password"
              placeholder="Password"
              //  value={password}
              name="password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputBx">
            {loading ? (
              <div className="loading1" style={{ display: 'block' }}>
                Signing in
              </div>
            ) : (
              <input type="submit" value="Sign in" />
              // <input
              //   type="button"
              //   value="Sign in"
              //   onClick={() => dispatch(login(username, password))}
              // />
            )}
          </div>
          <div className="links">
            <a>Forget Password</a>
            <Link to="/register">Signup</Link>
          </div>
        </div>
        {/* </form> */}
      </div>
    </form>
  )
}

export default Login
