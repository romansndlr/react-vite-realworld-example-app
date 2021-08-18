import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom'
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
            <Link to="/" className="navbar-brand">
              conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right" data-testid="navbar">
              <li className="nav-item">
                <NavLink to="/" activeClassName="active" className="nav-link" end>
                  Home
                </NavLink>
              </li>
              {isAuth && (
                <>
                  <li className="nav-item">
                    <NavLink to="/editor" activeClassName="active" className="nav-link">
                      <i className="ion-compose" />
                      &nbsp;New Post
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/settings" activeClassName="active" className="nav-link">
                      <i className="ion-gear-a" />
                      &nbsp;Settings
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`/@${authUser.username}`} activeClassName="active" className="nav-link">
                      {authUser.username}
                      <img style={{ width: 24, height: 24, marginLeft: 12 }} src={authUser.image} />
                    </NavLink>
                  </li>
                </>
              )}
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
