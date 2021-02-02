import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormField from '../../../components/FormField'
import { validatePassword, validatePasswordEquality } from '../../../utils/validation'
import TogglePasswordVisibility from './TogglePasswordVisibility'

function ResetPasswordForm() {
  const [passwordVisibility, setPasswordVisibility ]  = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const validationSchema = yup.object({
    password1: validatePassword,
    password2: validatePasswordEquality
  })

  const initialalues = {
    password1: '',
    password2: ''
  }

  const handleFormSubmit = (values) => {
    console.log(values)
  }

  const formik = useFormik({
    initialValues: initialalues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  })

  return (
    <section>
      <h2>Reset Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormField
          type='password'
          name='password1'
          label='Password'
          autoFocus
          value={formik.values.password1}
          onChange={formik.handleChange}
          error={formik.touched.password1 && Boolean(formik.errors.password1)}
          helperText={formik.touched.password1 && formik.errors.password1}
        />

        <FormField
          type={passwordVisibility ? 'text' : 'password'}
          name='password2'
          label='Confirm Password'
          value={formik.values.password2}
          onChange={formik.handleChange}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
        />

        {/* <button onClick={togglePasswordVisibility}>Toggle visibility</button> */}
        <TogglePasswordVisibility passwordVisible={passwordVisibility} onClick={togglePasswordVisibility} errorState={formik.touched.password2 && Boolean(formik.errors.password2)}/>

        <FormField
          type='submit'
          name='submit'
          value='Reset Password'
        />
      </form>
    </section>
  )
}

export default ResetPasswordForm
