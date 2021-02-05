import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../PrimaryFooter/PrimaryFooter'
import ScrollToTop from '../../../components/ScrollToTop'
import Button from '../../../components/Button'
import BANNER_IMAGE from '../../../assets/images/raster/community_support.jpg'
import { Grid } from '@material-ui/core'
import RouterLink from '../../../components/RouteLink'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 'fit-content',
    display: 'flex',
    flexDirection: 'column'
  },
  homeBanner: {
    position: 'relative',
    height: '300px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: theme.spacing(0)
  },
  concept: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '180px',
    borderRadius: '10px',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.19)',
    bottom: theme.spacing(-14),
    right: theme.spacing(5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      right: theme.spacing(25),
    },
    [theme.breakpoints.up('lg')]: {
      right: theme.spacing(35),
    }
  },
  conceptHeader: {
    marginBottom: theme.spacing(0),
    paddingLeft: theme.spacing(1)
  },
  conceptParagraph: {
    paddingLeft: theme.spacing(1),
    fontSize: '0.95rem'
  }
}))

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <PrimaryHeader />
      <main style={{padding: 0}}>
        <section style={{backgroundImage: `url(${BANNER_IMAGE})`}} className={classes.homeBanner}>
         <Grid xs={5} className={classes.concept}>
           <h3 className={classes.conceptHeader}>Concept Paper</h3>
           <p className={classes.conceptParagraph}>
             This is a concept project for Group 21 of the Computer Science Year 1 class at Makerere University. 
           </p>
          <RouterLink to='/concept-paper'>
            <Button>Read concept</Button>
          </RouterLink>
         </Grid>
        </section>
        <h1>fsf</h1>
        <h1>fsf</h1>
        <h1>fsf</h1>
        <h1>fsf</h1>
      </main>
      <ScrollToTop />
      <PrimaryFooter />
    </div>
  )
}

export default Home
