import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Article, Auth, Home } from './pages'
import { useAuth } from './hooks'

import './App.css'

function App() {
  // Set "active" class on the active link
  // Show links according to auth status
  // Set up new routes for /login and /register

  const { isAuth } = useAuth()
  return (
    <Router>
      <header>
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand">conduit</a>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <NavLink to="/" activeClassName="active" className="nav-link">
                  Home
                </NavLink>
              </li>
              {isAuth && (
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
                  <li className="nav-item">
                    <a className="nav-link">
                      {/* Auth user avatar */}
                      <img src="#" />
                      {/* Auth user username */}
                    </a>
                  </li>
                </React.Fragment>
              )}

              {/* End logged in */}

              {!isAuth && (
                <React.Fragment>
                  {' '}
                  <li className="nav-item">
                    <NavLink to="/register" activeClassName="active" className="nav-link">
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" activeClassName="active" className="nav-link">
                      Sign in
                    </NavLink>
                  </li>
                </React.Fragment>
              )}

              {/* End logged out */}
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:articleId" element={<Article />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
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
