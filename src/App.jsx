import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Article, Auth, Home } from './pages'
import { useAuth } from './hooks'

import './App.css'

function App() {
  const { isAuth } = useAuth()
  const { authUser } = useAuth()

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
                <>
                  <li className="nav-item">
                    <NavLink to="" activeClassName="active" className="nav-link">
                      <i className="ion-compose" />
                      &nbsp;New Post
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="" activeClassName="active" className="nav-link">
                      <i className="ion-gear-a" />
                      &nbsp;Settings
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="" activeClassName="active" className="nav-link">
                      {/* Auth user avatar */}
                      <img src={authUser.image} />
                      {authUser.username}
                    </NavLink>
                  </li>
                </>
              )}

              {/* End logged in */}

              {!isAuth && (
                <>
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
                </>
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
