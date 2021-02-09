import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import store from 'store'
import FormField from '../../../components/FormField'
import { makeStyles } from '@material-ui/core/styles'
import { validateEmail, validatePassword } from '../../../utils/validation'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

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
    minHeight: '150px',
    justifyContent: 'space-around'
  },
  bannerInfo: {
    fontSize: '0.85rem',
    textAlign: 'center'
  },
  formActionLink: {
    oolor: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 600,
    '&:active': {
      color: theme.palette.primary.main
    },
    '&:focus': {
      color: theme.palette.primary.main
    },
    '&:visited': {
      color: theme.palette.primary.main
    }
  },
  backBox: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const validationSchema = yup.object({
  email: validateEmail,
  password: validatePassword
})

function LoginForm({ userKnowsPassword, setUser }) {
  const classes = useStyles()
  const [knowsPassword, setKnowsPassword] = useState(userKnowsPassword)
  let initialValues = {}
  
  knowsPassword ? initialValues = {email: '', password: '' } : initialValues = { email: '' }

  const handleFormSubmit = async (values, { resetForm }) => {
    if (values.password) {
      let response = () => {
        return new Promise(function(resolve, reject) {
          axios.post('http://127.0.0.1:4000/users/login', { email: values.email, password: values.password })
          .then(response => resolve(response))
        })
      }
      let result = await response()
      if (result.data.status === 200) {
        resetForm()
        setUser(result.data)
        store.set('accessToken', result.data.accessToken)
        store.set('refreshToken', result.data.refreshToken)
      }
    } else {
      console.log(`Email ${values.email}`);
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
    <section className={classes.formSection}>
      {knowsPassword ? <h2 className={classes.formHeader}>Sign in</h2> : <h2 className={classes.formHeader}>Forgot Password</h2>}
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <FormField
          type='text'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {knowsPassword ? (
          <FormField
            type='password'
            name='password'
            label='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        ): (
          <p className={classes.bannerInfo}>Please provide your email address</p>
        )
        }

        <FormField
          type='submit'
          name='submit'
          value={knowsPassword ? 'Login' : 'Request new Password'}
        />
      </form>

      <Link 
        className={classes.formActionLink} 
        to='/login' onClick={toggleKnowsPassword}>
          {knowsPassword ? 
            'Forgot your password?': 
            (
              <span className={classes.backBox}>
                <BiArrowBack size={17} style={{marginRight: '5px'}} />Go back
              </span>
            )}</Link>
    </section>
  )
}

export default LoginForm
