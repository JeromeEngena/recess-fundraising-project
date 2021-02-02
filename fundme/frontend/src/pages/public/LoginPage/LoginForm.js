import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormField from '../../../components/FormField'
import { validateEmail, validatePassword } from '../../../utils/validation'
import RouterLink from '../../../components/RouteLink'

const validationSchema = yup.object({
  email: validateEmail,
  password: validatePassword
})

function LoginForm({ userKnowsPassword }) {
  const [knowsPassword, setKnowsPassword] = useState(userKnowsPassword)
  let initialValues = {}
  
  knowsPassword ? initialValues = {email: '', password: '' } : initialValues = { email: '' }

  const handleFormSubmit = ({ email, password }) => {
    if (password) {
      console.log(`Email: ${email} and Password: ${password}`);
    } else {
      console.log(`Email ${email}`);
      
    }
  }
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  })

  const toggleKnowsPassword = (e) => {
    setKnowsPassword(!knowsPassword)
  }  

  return (
    <section>
      {knowsPassword ? <h2>Sign in</h2> : <h2>Forgot Password</h2>}
      <form onSubmit={formik.handleSubmit}>
        <FormField
          type='text'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {knowsPassword && (
          <FormField
            type='password'
            name='password'
            label='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        )}

        <FormField
          type='submit'
          name='submit'
          value={knowsPassword ? 'Login' : 'Request new Password'}
        />
      </form>

      <RouterLink to='login' onClick={toggleKnowsPassword} >{knowsPassword ? 'Forgot your password?': 'Go back'}</RouterLink>
    </section>
  )
}

export default LoginForm
