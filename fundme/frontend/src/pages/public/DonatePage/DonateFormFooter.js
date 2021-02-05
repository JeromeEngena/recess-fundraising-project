import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  disclaimer: {
    backgroundColor: theme.palette.primary.main
  }
}))

function DonateFormFooter() {
  const classes = useStyles()

  return (
    <div className={classes.disclaimer}>
      The beneficiaries will receive your donation directly. <br />
      Donations are processed by the MTN Momo api. <br />
      Learn more from our <Link to='/djfdk'>Terms of Service</Link>.
    </div>
  )
}

export default DonateFormFooter
