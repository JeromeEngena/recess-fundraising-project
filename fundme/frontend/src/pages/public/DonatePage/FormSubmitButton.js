import React from 'react'
import { ImSpinner } from 'react-icons/im'
import { MdDone } from 'react-icons/md'

function FormSubmitButton({ formState, ...rest }) {
  switch (formState) {
    case 'submitting': return (
      <button type='submit' {...rest} >
        <ImSpinner /> Submit
      </button>
    )

    case 'submited': return (
      <button type='submit' {...rest} >
        <MdDone/> Submit
      </button>
    )
    
    default: return (
      <button type='submit' {...rest} >
        Submit
      </button>
    )
  }
}

export default FormSubmitButton
