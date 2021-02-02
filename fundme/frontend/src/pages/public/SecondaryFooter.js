import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

}))

function SecondaryFooter() {
  const classes = useStyles()
  return (
    <footer>
      <h1>I am the footer</h1>
    </footer>
  )
}

export default SecondaryFooter
