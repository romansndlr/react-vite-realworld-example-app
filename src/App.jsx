import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Article, Register, Home } from './pages'

import './App.css'

function App() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(true)
  // Set "active" class on the active link
  // Show links according to auth status
  // Set up new routes for /login and /register

  return (
    <Router>
      <header>
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand">conduit</a>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <a className="nav-link">Home</a>
              </li>
              {/* Start logged in */}
              {userLoggedIn && (
                <React.Fragment>
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="ion-compose" />
                      &nbsp;New Post
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="ion-gear-a" />
                      &nbsp;Settings
                    </a>
                  </li>
                </React.Fragment>
              )}
              <li className="nav-item">
                <a className="nav-link">
                  {/* Auth user avatar */}
                  <img src="#" />
                  {/* Auth user username */}
                </a>
              </li>
              {/* End logged in */}

              {/* Start logged out */}
              <li className="nav-item">
                <a className="nav-link">Sign up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Sign in</a>
              </li>
              {/* End logged out */}
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/register" element={<Register setUserLoggedIn={setUserLoggedIn} />}></Route>
          <Route path="/" element={<Home userLoggedIn={userLoggedIn} />} />
          <Route path="/article/:articleId" element={<Article />} />
        </Routes>
      </main>
      <footer>
        <div className="container">
          <a className="logo-font">conduit</a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </Router>
  )
}

export default App
