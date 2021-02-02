import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RouterLink from '../../components/RouteLink'

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

function SecondaryHeader(props) {
  const classes = useStyles()
  return (
    <nav>
      <div className={classes.navLeft}>
        <RouterLink to='/'>
          <h3 className={classes.logo}>goFundMe</h3>
        </RouterLink>
      </div>

      <div className={classes.navRight}>
        <span>Do not have an account?</span>
        <RouterLink to={props.path}>{props.label}</RouterLink>
      </div>
    </nav>
  )
}

export default SecondaryHeader
