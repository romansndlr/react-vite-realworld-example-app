import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../hooks'

function LoggedInRoute(props) {
  const { isAuth } = useAuth()

  return isAuth ? <Route {...props} /> : <Navigate to="/login" />
}

export default LoggedInRoute
