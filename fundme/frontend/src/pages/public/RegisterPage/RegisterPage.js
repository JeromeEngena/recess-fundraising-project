import React from 'react'
import SecondaryFooter from '../SecondaryFooter'
import SecondaryHeader from '../SecondaryHeader'
import RegisterForm from './RegisterForm'

function RegisterPage() {
  return (
    <main>
      <SecondaryHeader path='/login' label='Login' />

      <RegisterForm />

      <SecondaryFooter />
    </main>
  )
}

export default RegisterPage
