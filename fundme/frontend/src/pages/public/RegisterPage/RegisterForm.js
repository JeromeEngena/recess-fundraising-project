import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormField from '../../../components/FormField'
import { 
  validatePassword, 
  validateEmail, 
  validatePhoneNumber, 
  validatePasswordEquality,
  validateName
} from '../../../utils/validation'
import TogglePasswordVisibility from '../../protected/ResetPasswordPage/TogglePasswordVisibility'

const validationSchema = yup.object({
  first_name: validateName('First Name'),
  last_name: validateName('Last Name'),
  email: validateEmail,
  telephone: validatePhoneNumber,
  password1: validatePassword,
  password2: validatePasswordEquality
})

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  telephone: '',
  password1: '', 
  password2: ''
}

const handleFormSubmit = (values) => {
  const { first_name, last_name, telephone, password1 } = values
  console.log(last_name);
}

function RegisterForm() {

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  })

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormField
          type='text'
          name='first_name'
          label='First Name'
          autoFocus
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />

        <FormField
          type='text'
          name='last_name'
          label='Last Name'
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />

        <FormField
          type='text'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <FormField
          type='text'
          name='telephone'
          label='Phone Number'
          value={formik.values.telephone}
          onChange={formik.handleChange}
          error={formik.touched.telephone && Boolean(formik.errors.telephone)}
          helperText={formik.touched.telephone && formik.errors.telephone}
        />

        <FormField
          type='password'
          name='password1'
          label='Password'
          value={formik.values.password1}
          onChange={formik.handleChange}
          error={formik.touched.password1 && Boolean(formik.errors.password1)}
          helperText={formik.touched.password1 && formik.errors.password1}
        />

        <FormField
          type='password'
          name='password2'
          label='Confirm Password'
          value={formik.values.password2}
          onChange={formik.handleChange}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
        />

        <FormField
          type='submit'
          name='submit'
          value='Create Account'
        />
      </form>
    </section>
  )
}

export default RegisterForm
