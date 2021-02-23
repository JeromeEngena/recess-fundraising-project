const uniqid = require('uniqid')

exports.generateUniqid = () => {
  return uniqid.time()
}