import * as yup from 'yup'

const validateEmail = yup
  .string('Enter your email')
  .email('Enter valid email')
  .required('Email is required')

const validatePassword = yup
  .string('Enter password')
  .min(8, '8 or more characters required')
  .required('Password is required')

const validatePasswordEquality = yup
  .string()
  .required('Password is required')
  .oneOf([yup.ref('password1'), null], 'Passwords must match')

const validatePhoneNumber = yup
  .string('Enter your phone number')
  .required('Phone number is required')
  .matches('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$', 'Phone number is not valid')

const validateName = (label) => {
  return yup
    .string()
    .required(`${label} is required`)
}


export { 
  validateEmail, 
  validatePassword, 
  validatePasswordEquality, 
  validatePhoneNumber,
  validateName
}