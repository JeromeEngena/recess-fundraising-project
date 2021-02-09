import React, { useContext} from 'react'
import LoginForm from './LoginForm'
import { makeStyles } from '@material-ui/core/styles'
import SecondaryFooter from '../SecondaryFooter'
import SecondaryHeader from '../SecondaryHeader'
import {UserContext } from '../../../context/Auth'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}))

function LoginPage() {
    const { user, setUser } = useContext(UserContext)

  const classes = useStyles()
  return (
    <main className={classes.root}>
      <SecondaryHeader path='/register' label='Sign up' />

      <LoginForm userKnowsPassword={true} setUser={setUser}/>

      <SecondaryFooter />
    </main>
  )
}

export default LoginPage

