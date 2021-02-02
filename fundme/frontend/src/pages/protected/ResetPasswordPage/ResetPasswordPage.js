import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RouterLink from '../../../components/RouteLink/'
import ResetPasswordForm from './ResetPasswordForm'
import SecondaryFooter from '../../public/SecondaryFooter'

const useStyles = makeStyles(theme => ({
  nav: {

  },
  navLeft: {

  },
  logo: {

  },
  navRight: {

  }
}))

function LoginPage() {
  const classes = useStyles()
  return (
    <main>
      <nav>
        <div className={classes.navLeft}>
          <h3 className={classes.logo}>goFundMe</h3>
        </div>

        <div className={classes.navRight}>
          <span>Remembered your password?</span>
          <RouterLink to='/login'>Log in</RouterLink>
        </div>
      </nav>

      <ResetPasswordForm />

      <SecondaryFooter />
     
    </main>
  )
}

export default LoginPage
