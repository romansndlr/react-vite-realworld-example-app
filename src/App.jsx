import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import { Article, Auth, Home } from './pages'

import './App.css'
import { useAuth } from './hooks'

function App() {
  // Set "active" class on the active link
  // Show links according to auth status
  // Set up new routes for /login and /register
  const { isAuth, authUser } = useAuth()

  return (
    <Router>
      <header>
        <nav className='navbar navbar-light'>
          <div className='container'>
            <a className='navbar-brand'>conduit</a>
            <ul className='nav navbar-nav pull-xs-right'>
              <li className='nav-item'>
                <a className='nav-link'>Home</a>
              </li>

              {isAuth ? (
                <>
                  <li className='nav-item'>
                    <a className='nav-link'>
                      <i className='ion-compose' />
                      &nbsp;New Post
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link'>
                      <i className='ion-gear-a' />
                      &nbsp;Settings
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link'>
                      {authUser.username} <img src={authUser.image} alt="avatar"/>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <NavLink to='/register' activeClassName='active' className='nav-link'>Sign up</NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to='/login' activeClassName='active' className='nav-link'>Sign in</NavLink>
                  </li>
                </>
              )}


            </ul>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Auth />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/article/:slug' element={<Article />} />
        </Routes>
      </main>
      <footer>
        <div className='container'>
          <a className='logo-font'>conduit</a>
          <span className='attribution'>
            An interactive learning project from <a href='https://thinkster.io'>Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </Router>
  )
}

export default App
