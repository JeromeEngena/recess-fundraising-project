import React from 'react'
import decode from 'jwt-decode'
import { Redirect, Router } from 'react-router-dom'

const checkAuth = () => {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  if (!accessToken || !refreshToken) {
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
        // <Redirect to={{ pathname: '/' }} from={props.location}/>
        <div>Bye bye</div>
      )
    )}
    />
  )
}

export default Authenticate

// class Auth {
//   constructor() {
//     this.authenticated = false
//   }

//   login(callback) {
//     this.authenticated = true
//     callback()
//   }

//   logout(callback) {
//     this.authenticated = false
//     callback()
//   } 

//   isAuthenticated() {
//     return this.authenticated
//   }
// }

// export default new Auth()
