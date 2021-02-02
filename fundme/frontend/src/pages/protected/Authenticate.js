import React from 'react'
import decode from 'jwt-decode'
import { Redirect, Router } from 'react-router-dom'

const checkAuth = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  if (!token || !refreshToken) {
    return false
  }

  try {
    const { exp } = decode(refreshToken)
    if (exp < new Date().getTime() / 1000) {
      return false
    }
  } catch(e) {
    return false
  }

  return true
}

function Authenticate({ component: Component, ...rest }) {
  return (
    <Router {...rest} render={props =>(
      checkAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    )}
    />
  )
}

export default Authenticate
