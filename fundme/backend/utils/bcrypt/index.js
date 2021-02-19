const bcrypt = require('bcrypt')

exports.encryptData = ({data, saltRounds = 10, callback}) => {
  bcrypt.hash(data, saltRounds, (error, hashedData) => {
    if (error)
      callback(error, null)
    if (!hashedData)
      callback(null, null)
    callback(null, hashedData)
  })
}

exports.compareWithEncryptedData = ({unencryptedData, encryptedData, callback}) => {
  bcrypt.compare(unencryptedData, encryptedData, (error, result) => {
    if (error)
      callback(error, null)
    if (!result)
      callback(null, null)
    callback(null, result)
  })
}