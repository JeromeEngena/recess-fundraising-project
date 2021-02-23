const bcrypt = require('bcrypt')

exports.encryptData = ({data, saltRounds = 10, callback}) => {
  bcrypt.hash(data, saltRounds, (error, hashedData) => {
    if (error)
      return callback(error, null)
    if (!hashedData)
      return callback(null, null)
    callback(null, hashedData)
  })
}

exports.compareWithEncryptedData = ({unencryptedData, encryptedData, callback}) => {
  bcrypt.compare(unencryptedData, encryptedData, (error, result) => {
    if (error)
      return callback(error, null)
    if (!result)
      return callback(null, null)
    callback(null, result)
  })
}