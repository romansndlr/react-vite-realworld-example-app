import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

function Register({ setUserLoggedIn }) {
  const [errors, setErrors] = React.useState('')
  // Get the token from the API
  // Store in localStorage
  // Set authUser as globally available state
  // Redirect to home page

  const navigate = useNavigate()
  async function handleSubmit(event) {
    event.preventDefault()
    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      const res = await axios.post('/users', {
        user: {
          username,
          email,
          password,
        },
      })

      console.log(res)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.user.token)
        setUserLoggedIn(true)
        axios.defaults.headers.common['Authorization'] = 'Token ' + res.data.user.token
        navigate('/')
      }
    } catch (err) {
      setErrors(JSON.stringify(err.response.data.errors))
    }
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            {/* Change to "Sign up" when on login page */}
            <h1 className="text-xs-center">Register</h1>
            <p className="text-xs-center">
              {/* Change to "Need an account?" when on login page */}
              <a href="#">Have an account?</a>
            </p>
            <form onSubmit={handleSubmit}>
              {/* Remove on login page */}
              <fieldset className="form-group">
                <input type="text" name="username" className="form-control form-control-lg" placeholder="Your Name" />
              </fieldset>
              <fieldset className="form-group">
                <input type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                />
              </fieldset>
              {/* Disable button while submitting */}
              <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                {/* Change to "Sign in" on login page */}
                Sign up
              </button>
              <div style={{ color: 'red' }}>{errors}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
