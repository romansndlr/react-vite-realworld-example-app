import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Article, Home } from './pages'
import {QueryClient, QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'

const queryClient = new QueryClient()

function App() {
  return (

    <Router>
      <QueryClientProvider client={queryClient}>
      <header>
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand">conduit</a>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <a className="nav-link">Home</a>
              </li>
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
                <a className="nav-link" to="/register">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" to="/login">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
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
        <ReactQueryDevtools containerElement="div" initialIsOpen={false}/>
      </QueryClientProvider>
    </Router>
  )
}

export default App
