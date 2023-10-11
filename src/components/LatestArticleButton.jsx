import React from 'react'
import { NavLink } from 'react-router-dom'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import jwt from 'jwt-decode'

import '../styles/drawer.css'
import ArticlePreview from './ArticlePreview'
import { useLazyGetLatestArticleQuery, useLazyGetTokenQuery } from '../api/apiSlice'

function LatestArticleButton() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentToken, setCurrentToken] = React.useState(null)
  const [content, setContent] = React.useState('')
  const [getLatestArticle, results] = useLazyGetLatestArticleQuery()
  const [getToken, token] = useLazyGetTokenQuery()

  const toggleDrawer = () => {
    setIsOpen(() => {
      if (!currentToken) {
        getToken()
      } else if (jwt(currentToken).exp < Date.now() / 1000) {
        getToken()
      }

      return true
    })
  }

  React.useEffect(() => {
    if (!results || results.isLoading) {
      setContent(<p>Loading...</p>)
    }
    if (results && results.isSuccess) {
      setContent(<ArticlePreview article={results.data} />)
    }
  }, [results])

  React.useEffect(() => {
    setCurrentToken(token.data)
    if (token.isSuccess) {
      getLatestArticle({ token: token.data })
    }
  }, [getLatestArticle, token])

  return (
    <>
      <NavLink
        onClick={() => {
          toggleDrawer()
        }}
        activeClassName="active"
        className="nav-link"
        to="#"
        end
      >
        Latest Article
      </NavLink>
      <Drawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        size={500}
        direction="left"
      >
        <div className="drawer">
          <div className="navbar navbar-light">
            <span className="navbar-brand">conduit</span>
          </div>
          <div className="drawer banner">
            <div className="container">
              <h1 className="logo-font">Latest Article</h1>
            </div>
          </div>
          <div className="container">{content}</div>
        </div>
      </Drawer>
    </>
  )
}

export default LatestArticleButton
