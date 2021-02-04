// import React, { useState } from 'react'
// import { AuthConsumer } from  '../../context/Auth/AuthContext'
// import axios from 'axios'

// function Login() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleEmailChange = e => {
//     setEmail(e.target.value)
//   }

//   const handlePasswordChange = e => {
//     setPassword(e.target.value)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const data = { email: email, password: password }
    
//     axios({
//       method: 'post',
//       url: '/users/login',
//       baseURL: 'http://localhost:4000/',
//       data: data
//     })
//       .then(res => {
//         const { data } = res
//         if (data.auth) {
//           localStorage.setItem('token', data.token)
//           console.log(data);
//         }
//       })
//       .catch(error => console.error(error))
//   }

//   return (
//     <div>
//       <h1>Hello, I am the login page</h1>

//         <form noValidate onSubmit={handleSubmit}>
//           <label htmlFor='email'>Email</label>
//           <input type='email' id='email' name='email' value={email} onChange={handleEmailChange} />

//           <label htmlFor='password'>Password</label>
//           <input type='password' id='password' name='password' value={password} onChange={handlePasswordChange} />
          
//           <input type='submit' value='Login' />
//         </form>

//     </div>
//   )
// }

// export default Login

import React from 'react'
import LoginForm from './LoginForm'
import { makeStyles } from '@material-ui/core/styles'
import SecondaryFooter from '../SecondaryFooter'
import SecondaryHeader from '../SecondaryHeader'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}))

function LoginPage() {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <SecondaryHeader path='/register' label='Sign up' />

      <LoginForm userKnowsPassword={true}/>

      <SecondaryFooter />
    </main>
  )
}

export default LoginPage

