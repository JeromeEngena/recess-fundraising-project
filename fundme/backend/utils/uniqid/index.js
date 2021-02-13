const uniqid = require('uniqid')

exports.generateUniqueId = () => {
  return uniqid.time()
}