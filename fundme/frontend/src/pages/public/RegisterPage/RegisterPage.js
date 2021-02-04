import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SecondaryFooter from '../SecondaryFooter'
import SecondaryHeader from '../SecondaryHeader'
import RegisterForm from './RegisterForm'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }
}))

function RegisterPage() {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <SecondaryHeader path='/login' label='Login' />

      <RegisterForm />

      <SecondaryFooter />
    </main>
  )
}

export default RegisterPage
