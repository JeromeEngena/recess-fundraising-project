import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import FormField from '../../../components/FormField'
import { makeStyles } from '@material-ui/core/styles'
import FormSubmitButton from './FormSubmitButton'
import { validateName, validateEmail, validatePhoneNumber } from '../../../utils/validation'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  form: {
    order: 2,
    backgroundColor: 'pink',
    padding: theme.spacing(1),
    borderRadius: '10px',
    color: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(0),
      borderRadius: '10px',
    }
  },
  donationField: {
    // backgroundColor: 'green',
    paddingTop: theme.spacing(1)
  },
  donationLabel: {
    fontSize: '1.5rem'
  },
  donationFieldInput: {
    height: '70px',
    width: '100%',
    display: 'flex',
    position: 'relative',
    marginTop: theme.spacing(1)
  },
  donationInput: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(13),
    fontSize: '3.5rem',
    fontWeight: 300,
    borderRadius: '10px',
    color: theme.palette.primary.dark,
    border: 'none',
    backgroundColor: theme.palette.secondary.light,
    '&:focus': {
      outline: 'none',
      border: 'none'
    }
  },
  donationCurrencyBox: {
    position: 'absolute',
    left: theme.spacing(2),
    top: '50%',
    fontSize: '2.0rem',
    fontWeight: 900,
    color: theme.palette.primary.dark,
  },
  tipFiled: {
    marginTop: theme.spacing(6),
    borderTop: '1px solid rgba(87, 62, 222, 0.3)',
    paddingTop: theme.spacing(0)
  },
  tipFieldHeader: {
    fontSize: '0.9rem'
  },
  tipFieldInputBox: {
    display: 'flex',
    alignItems: 'stretch',
    fontSize: '0.85rem'
  },
  tipFieldInputBoxLeft: {
    display: 'flex',
    alignItems: 'center',
    maxHeight: '50px',
    [theme.breakpoints.up('md')]: {
      flex: 1,
      justifyContent: 'flex-end'
    }
  },
  tipFieldInputBoxRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      flex: 'none'
    }
  },
  tipFieldInput: {
    display: 'flex',
    position: 'relative',
    height: '50px'
  },
  tipInput: {
    width: '100%',
    maxWidth: '220px',
    height: '100%',
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(6),
    fontSize: '2.5rem',
    fontWeight: 300,
    borderRadius: '10px',
    color: theme.palette.primary.dark,
    border: 'none',
    backgroundColor: theme.palette.secondary.light,
    '&:focus': {
      outline: 'none',
      border: 'none'
    }
  },
  tipCurrencyBox: {
    position: 'absolute',
    top: '45%',
    left: theme.spacing(1),
    fontSize: '1rem',
    fontWeight: 900,
    color: theme.palette.primary.dark
  },
  totalDonation: {
    marginTop: theme.spacing(1.5)
  },
  totalCurrencyBox: {
    fontWeight: 900,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  mainFormFields: {
    borderTop: '1px solid rgba(87, 62, 222, 0.3)',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  namesWrapper: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'stretch'
    }
  },
  locationWrapper: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'stretch'
    }
  },
  profileVisibilityBox: {
    
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: '0.9rem'
  }
}))

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  donation: '',
  tip: '',
  country: 'Uganda',
  town: '',
  profileVisibility: true
}

const validationSchema = yup.object({
  // firstName: validateName,
  // lastName: validateName,
  // email: validateEmail,
  // telephone: validatePhoneNumber
})

const handleFormSubmit = (values) => {
  console.log(values)
}

function DonateForm() {
  const classes = useStyles()
  const [ formState, setFormState ] = useState('submitting')

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit
  
  })

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div className={classes.donationField}>
        <label htmlFor='donation' className={classes.donationLabel}>Enter your donation</label>
        <div className={classes.donationFieldInput}>
          <input 
            type='text'
            name='donation'
            id='donation' 
            value={formik.values.donation}
            onChange={formik.handleChange}
            className={classes.donationInput}
          />
          <span className={classes.donationCurrencyBox}>UGX.</span>
        </div>
      </div>

      <div className={classes.tipFiled}>
        <p className={classes.tipFieldHeader}>
          Givar has a 0% platform fee for organizers. Leaving a tip to us will
          enable us keep offering this service the best way we can.
        </p>
        <div className={classes.tipFieldInputBox}>
          <label htmlFor='tip' className={classes.tipFieldInputBoxLeft}>
            Thank you for your tip of: 
          </label>
          <div className={classes.tipFieldInputBoxRight}>
            <div className={classes.tipFieldInput}>
              <input 
                type='text'
                name='tip'
                id='tip' 
                value={formik.values.tip}
                onChange={formik.handleChange}
                className={classes.tipInput}
              />
              <span className={classes.tipCurrencyBox}>UGX.</span>
            </div>
            <span className={classes.totalDonation}>
              Total charge:<span className={classes.totalCurrencyBox}>UGX.</span> 
              {`${formik.values.donation + formik.values.tip}`}
            </span>
          </div>
        </div>
      </div>

      <div className={classes.mainFormFields}>
        <div className={classes.namesWrapper}>
          <FormField
            type='text'
            name='firstName'
            label='First Name'
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />

          <FormField
            type='text'
            name='lastName'
            label='Last Name'
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </div>

        <FormField
          type='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <div className={classes.locationWrapper}>
          <FormField
            type='text'
            name='country'
            label='Country'
            value={formik.values.country}
            onChange={formik.handleChange}
            />

          <FormField
            type='text'
            name='town'
            label='Town'
            value={formik.values.town}
            onChange={formik.handleChange}
          />
        </div>

        <span className={classes.profileVisibilityBox}>
          <FormField
            type='checkbox'
            name='profileVisibility'
            label='Make my donation anonymous to organizer and others'
            fullWidth
            style={{fontSize: '0.5rem'}}
        />
        </span>

        <FormField
          type='text'
          name='telephone'
          label='telephone'
          value={formik.values.telephone}
          onChange={formik.handleChange}
          error={formik.touched.telephone && Boolean(formik.errors.telephone)}
          helperText={formik.touched.telephone && formik.errors.telephone}
        />
      </div>

      <FormSubmitButton formState={formState} />

      <footer className={classes.formFooter}>
        <small className={classes.footerDisclaimer}>
          By continuing, you agree to the Givar terms and acknowledge receipt
          of our privacy policy.
        </small>
        <Link to='/' className={classes.backToProjectLink}>Go back</Link>
      </footer>
    </form>
  )
}

export default DonateForm