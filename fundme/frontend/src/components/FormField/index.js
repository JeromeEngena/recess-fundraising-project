import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  submitBtn: {
    backgroundColor: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}`,
    fontFamily: theme.typography.fontFamily,
    boxShadow: 'none',
    borderRadius: '4px',
    padding: '7px 15px',
    color: 'white',
    cursor: 'pointer',
    margin: theme.spacing(1),
    transition: 'all 100ms ease 0s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      border: `1px solid ${theme.palette.secondary.dark}`
    }
  },
  inputField: {
    margin: theme.spacing(1),
    color: theme.palette.secondary.dark
  }
}))

function FormField(props) {
  const classes = useStyles()
  const { type, name, label, value, ...others } = props

  switch (type) {
    case 'text': return (
      <TextField 
        className={classes.inputField}
        id={name} 
        name={name}
        label={label}
        type={type}
        value={value}
        variant='outlined'
        size='small'
        {...others}
      />
    )  

    case 'email': return (
      <TextField
        className={classes.inputField}
        id={name}
        name={name}
        label={label}
        type={type}
        value={value}
        variant='outlined'
        size='small'
        {...others}
      />
    )

    case 'password': return (
      <TextField
        className={classes.inputField}
        id={name}
        name={name}
        label={label}
        type={type}
        value={value}
        variant='outlined'
        size='small'
        {...others}
      />
    )
    
    case 'submit': return (
      <button 
        className={classes.submitBtn}
        type={type}
        id={name}
        name={name}
        {...others}
      >{value}
      </button>
    )

    case 'multiline': return (
      <TextField
      />
    )

    default: return(
      <></>
    )
  }
}

export default FormField
