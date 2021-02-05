import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Checkbox, FormControlLabel } from '@material-ui/core'

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
    color: theme.palette.primary.light,
  },
  checkbox: {
    fontSize: '0.8rem'
  }
}))

function FormField(props) {
  const classes = useStyles()
  const { type, name, label, value, checked, ...others } = props

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

    case 'checkbox': return (
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={checked}
            disableRipple
            color='primary'
            
          />
        }
        label={label}
        className={classes.checkbox}
      />
    )

    default: return(
      <></>
    )
  }
}

export default FormField
