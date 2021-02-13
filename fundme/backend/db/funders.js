const { Funder, Project } = require('../models')

const db = {
  checkIfFunderExists: ({query, callback}) => {
    Funder.exists(query, (error, funderExists) => {
      if (error)
        callack(error, null)
      callback(null, funderExists)
    })
  },

  findExistingFunderByTelephone: ({query, callback}) => {
    Funder.findOne(query, (error, funder) => {
      if (error)
        callback(error, null)
      callback(null, funder)
    })
  },

  saveFunderToDB: ({funder, callback}) => {
    Funder.save(funder, (error, funder) => {
      if (error)
        callback(error, null)
      callback(null, funder)
    })
  },

  updateFunder: ({query, update, callback}) => {
    Funder.findOneAndUpdate(query, update, {returnOriginal: false}, (error, updatedFunder) => {
      if (error)
        callback(error, null)
      if (!updatedFunder)
        callback(null, null)
      callback(null, updatedFunder)
    })
  }
}

export default db