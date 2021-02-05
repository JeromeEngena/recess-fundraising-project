import { Container, Grid } from '@material-ui/core'
import React from 'react'
import DonateForm from './DonateForm'
import DonateFormHeader from './DonateFormHeader'
import DonateFormFooter from './DonateFormFooter'
import ProjectPageHeader from '../ProjectPage/ProjectPageHeader'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  wrapper: {
    padding: theme.spacing(0),
    flex: 1,
    display: 'flex',
    backgroundColor: 'magenta'
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-reverse',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  },
  innerForm: {
    order: 2,
    backgroundColor: 'red',
    padding: theme.spacing(2),
    height: 'fit-content',
    paddingTop: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      order: 1,
      padding: theme.spacing(2),
      marginTop: theme.spacing(4),
      borderRadius: '10px'
    }
  },
  innerHeader: {
    order: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      order: 2,
    }
  }
}))

function DonatePage() {
  const classes = useStyles()

  return (
    <Container maxWidth={'xl'} className={classes.root}>
      <ProjectPageHeader />
      <Container maxWidth={'md'} className={classes.wrapper}>
        <Grid xs={12} className={classes.innerWrapper} >
          <Grid xs={12} md={7} className={classes.innerForm}>
            <DonateForm />
          </Grid>
          <Grid xs={12} md={4} className={classes.innerHeader}>
            <DonateFormHeader />
          </Grid>
        </Grid>
      </Container>
      <DonateFormFooter />
    </Container>
  )
}

export default DonatePage
