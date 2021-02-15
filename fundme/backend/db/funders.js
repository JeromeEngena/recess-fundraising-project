const { Funder, Project } = require('../models')

const db = {
  checkIfFunderExists: ({query, callback}) => {
    Funder.exists(query, (error, funderExists) => {
      if (error)
        callack(error, null)
      callback(null, funderExists)
    })
  },

  findIfFunderExists: ({query, callback}) => {
    Funder.findOne(query, (error, funderxists) => {
      if (error)
        callback(error, null)
      callback(null, funderExists)
    })
  },

  saveFunderToDB: ({funder, callback}) => {
    let funderModel = new Funder(funder)
    funderModel.save((error, funder) => {
      if (error)
        callback(error, null)
      callback(null, funder)
    })
  },

  updateFunder: ({query, update, callback}) => {
    Funder.findOneAndUpdate(query, update, {new: true}, (error, updatedFunder) => {
      if (error)
        callback(error, null)
      if (!updatedFunder)
        callback(null, null)
      callback(null, updatedFunder)
    })
  },

  getAllFunders: ({callback}) => {
    Funder.find({}, (error, funders) => {
      if (error)
        callback(error, null)
      callback(null, funders)
    })
  },

  deleteFunder: ({query, callback}) => {
    Funder.findOneAndDelete(query, (error, deletedFunder) => {
      if (error)
        callback(error, null)
      callback(null, deletedFunder)
    })
  },

  findSectionOfFunder: ({query, callback}) => {
    
  }
}

export default db