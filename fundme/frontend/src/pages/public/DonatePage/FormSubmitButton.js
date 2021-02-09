import React from 'react'
import { ImSpinner } from 'react-icons/im'
import { MdDone } from 'react-icons/md'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  submitButton: {
    padding: '10px 50px',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.4rem',
    letterSpacing: '0.3rem',
    backgroundColor: theme.palette.secondary.light,
    color: 'white',
    cursor: 'pointer',
    fontWeight: 900,
    '&:focus': {
      border: 'none',
      outline: 'none'
    }
  }, 
  submittingButton: {
    padding: '10px 50px',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.4rem',
    letterSpacing: '0.3rem',
    backgroundColor: theme.palette.secondary.light,
    color: 'white',
    cursor: 'pointer',
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    '&:focus': {
      border: 'none',
      outline: 'none'
    }
  }, 
  submitedButton: {
    padding: '10px 50px',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.4rem',
    letterSpacing: '0.3rem',
    backgroundColor: theme.palette.secondary.light,
    color: 'white',
    cursor: 'pointer',
    fontWeight: 900,
    '&:focus': {
      border: 'none',
      outline: 'none'
    }
  },
  buttonSpinner:  {
    '@global': {
      '@keyframes rotating': {
        from: {
          transform: 'rotate(0deg)'
        },
        to: {
          transform: 'rotate(360deg)'
        }
      }
    },
    animation: '$rotating 2s linear infinite'
  }
}))

function FormSubmitButton({ formState, ...rest }) {
  const classes = useStyles()

  switch (formState) {
    case 'submitting': return (
      <button type='submit' {...rest} className={classes.submittingButton}>
        Processing <ImSpinner className={classes.buttonSpinner} />
      </button>
    )

    case 'submitted': return (
      <button type='submit' {...rest} className={classes.submitedButton}>
        Done <MdDone/>
      </button>
    )
    
    default: return (
      <button type='submit' {...rest} className={classes.submitButton}>
        Donate
      </button>
    )
  }
}

export default FormSubmitButton
