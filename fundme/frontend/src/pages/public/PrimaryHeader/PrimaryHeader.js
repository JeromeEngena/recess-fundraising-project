import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Ticker from '../../../components/Ticker'
import { Container } from '@material-ui/core'
import { BiLogIn } from 'react-icons/bi'
import RouterLink from '../../../components/RouteLink'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  header: {
    minHeight: 'fit-content',
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  topTicker:  {
    paddingTop: theme.spacing(0)
  },
  topHeader: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,

  },
  tickerMessage: {
    padding: theme.spacing(0),
    margin: theme.spacing(0.5),
    overFlow: 'hidden',
    whiteSpace: 'nowrap'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    letterSpacing: theme.spacing(0.7),
    fontSize: '1.9rem',
    height: 'fit-content',
    margin: theme.spacing(0),
  },
  headerLinks: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    height: 'fit-content',
  },
  headerLink: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    fontSize: '0.95rem'
  }
}))

const links = [
  {
    path: '/login',
    text: 'Login',
  },
  {
    path: '/register',
    text: 'Sign up'
  }
]

function PrimaryHeader() {
  const classes = useStyles()
  return (
    <header className={classes.header}>
        {/* top header with ticker */}
        {/* bottom header */}
        <div className={classes.topHeader}>
        <Container maxWidth='md' className={classes.topTicker}>
          <Ticker 
            speed={2} 
            message={'Note! This project is still under development'} 
            mode='await'>
              <p className={classes.tickerMessage}>Note! This project is still under development! Any feedback on bugs or defeciencies will be highly appreciated. </p>
            </Ticker>
        </Container>
        </div>
        
        <Container maxWidth='md'>
          <nav className={classes.nav}>
            <RouterLink to='/'><h5 className={classes.logo}>GIVAR</h5></RouterLink>
            <ul className={classes.headerLinks}>
              {links.map((link, index) => {
                  if (index === 0) {
                    return (
                        <li className={classes.headerLink}>
                          <BiLogIn size={23} className={classes.headerLinkIcon} />
                          <RouterLink to={link.path}>{link.text}</RouterLink>
                        </li>
                    )
                  } else {
                    return (
                      <li className={classes.headerLink}>
                        <RouterLink to={link.path}>{link.text}</RouterLink>
                      </li>
                    )
                  }
              })}
            </ul>
          </nav>
        </Container>
    </header>
  )
}

export default PrimaryHeader
