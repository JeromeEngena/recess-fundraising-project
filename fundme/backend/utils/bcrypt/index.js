const bcrypt = require('bcrypt')

const passwordEncrypter = {
  hashPassword: ({password, saltRounds, callback}) => {
    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
      if (error)
        callback(error, null)
      callback(null, hashedPassword)
    })
  },

  comparePasswords: ({unencryptedPassword, encryptedPassword, callback}) => {
    bcrypt.compare(unencryptedPassword, encryptedPassword, (error, result) => {
      if (error)
        callback(error, null)
      callback(null, result)
    })
  }
}

export default passwordEncrypter