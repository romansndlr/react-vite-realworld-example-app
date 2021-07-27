import React from 'react'

function Auth() {
  // Get the token from the API
  // Store in localStorage
  // Set authUser as globally available state
  // Redirect to home page

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            {/* Change to "Sign up" when on login page */}
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              {/* Change to "Need an account?" when on login page */}
              <a href="#">Have an account?</a>
            </p>
            <form>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
