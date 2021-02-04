import * as yup from 'yup'

const validateEmail = yup
  .string('Enter your email')
  .email('Enter valid email')
  .required('Email is required')

const validatePassword = yup
  .string('Enter password')
  .min(8, '8 or more characters required')
  .required('Password is required')
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // )

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


export { 
  validateEmail, 
  validatePassword, 
  validatePasswordEquality, 
  validatePhoneNumber,
  validateName
}