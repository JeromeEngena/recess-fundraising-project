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
  .required('Confirmation of password required')
  .oneOf([yup.ref('password1'), null], 'Passwords must match')

const validatePhoneNumber = yup
  .string('Enter your phone number')
  .required('Phone number is required')

const validateName = (label) => {
  return yup
    .string()
    .required(`${label} is required`)
}

const validateProjectName = yup
    .string().required('Project Name is required')

const validateProjectCategory = yup
  .string().required('Project category is required')


export { 
  validateEmail, 
  validatePassword, 
  validatePasswordEquality, 
  validatePhoneNumber,
  validateName,
  validateProjectName,
  validateProjectCategory
}