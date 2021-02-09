import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import FormField from '../../../components/FormField'
import { 
  validatePassword, 
  validateEmail, 
  validatePhoneNumber, 
  validatePasswordEquality,
  validateName
} from '../../../utils/validation'
import TogglePasswordVisibility from '../../protected/ResetPasswordPage/TogglePasswordVisibility'
import  { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main
  },
  formHeader: {
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '200px',
    justifyContent: 'space-around'
  }
}))

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

const registerUser = async (user) => {
  const response = await axios.post('http://127.0.0.1:4000/users/', user)
  console.log(response);
}

const handleFormSubmit = async (values, { resetForm }) => {
  const user = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    telephone: values.telephone,
    password: values.password1
  }
  let response = () => {
    return new Promise(function(resolve, reject) {
      axios.post('http://127.0.0.1:4000/users', user)
      .then(response => {
        resolve(response)
      })
    })
  }
  let result = await response()
  console.log(result);
  if (result.data.status === 201) {
    resetForm()
  }
}

function RegisterForm() {
  const classes = useStyles()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  })

  return (
    <section className={classes.formSection}>
      <h2 className={classes.formHeader}>Register</h2>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
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
