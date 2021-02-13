import React, {useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PrimaryHeader from '../PrimaryHeader/PrimaryHeader'
import PrimaryFooter from '../PrimaryFooter/PrimaryFooter'
import Button from '../../../components/Button'
import BANNER_IMAGE from '../../../assets/images/raster/community_support.jpg'
import { Container, Grid } from '@material-ui/core'
import RouterLink from '../../../components/RouteLink'
import axios from 'axios'
import { usePosition } from '../../../hooks/usePosition'
import Fundraisers from './Fundraisers'
import store from 'store'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
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
    bottom: theme.spacing(5),
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
  },
  fundraisersBox: {
    backgroundColor: 'red',
    display: 'flex'
  }
}))

function Home() {
  const classes = useStyles()
  const [ projects, setProjects ] = useState(store.get('projects') || [])
  const { latitude, longitude, positionError } = usePosition()
  
  useEffect(() => {
    axios.get('http://127.0.0.1:4000/projects')
      .then(response => {
        // console.log(response.data);
        store.set('projects', response.data)
        console.log(projects);
      })
      .catch(error => {
        console.log(error);
      })
    // return () => {
    //   store.remove('projects')
    // }
  }, [])

  return (
    <div className={classes.root}>
      <PrimaryHeader />
      <main style={{padding: 0}} className={classes.main}>
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
        {/* <Fundraisers projects={projects} /> */}
        {projects && <Fundraisers projects={projects} />}
      </main>
      <PrimaryFooter />
    </div>
  )
}

export default Home
