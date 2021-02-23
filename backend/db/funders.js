const {Funder} = require('../models')

exports.createFunder = ({funder, callback}) => {
  let newFunder = new Funder(funder)
  newFunder.save((error, createdFunder) => {
    if (error)
      return callback(error, null)
    if (!createdFunder)
      return callback(null, null)
    callback(null, createdFunder)
  })
}

exports.getFunder = ({query, callback}) => {
  Funder.findOne(query, (error, funder) => {
    if (error)
      return callback(error, null)
    if(!funder)
      return callback(null, null)
    callback(null, funder)
  })
}

exports.getFunders = ({query, callback}) => {
  Funder.find(query, (error, funders) => {
    if (error)
      return callback(error, null)
    if (!funders)
      return callback(null, null)
    callback(nul, funders)
  })
}

exports.getFunderById = ({query, callback}) => {
  Funder.findById(query, (error, funder) => {
    if (error)
      return callback(error, null)
    if (!funder)
      return callback(null, null)
    callback(null, funder)
  })
}

exports.checkIfFunderExists = ({query, callback}) => {
  Funder.exists(query, (error, funderExists) => {
    if (error)
      callack(error, null)
    callback(null, funderExists)
  })
}

exports.getAllFunders = ({callback}) => {
  Funder.find({}, (error, funders) => {
    if (error)
      return callback(error, null)
    callback(null, funders)
  })
}

exports.updateFunder = ({query, update, callback}) => {
  Funder.findOneAndUpdate(query, update, {new: true}, (error, updatedFunder) => {
    if (error)
      return callback(error, null)
    if (!updatedFunder)
      return callback(null, null)
    callback(null, updatedFunder)
  })
}

exports.deleteFunder = ({query, callback}) => {
  Funder.findByIdAndDelete(query, (error, deletedFunder) => {
    if (error)
      return callback(error, null)
    if (!deletedFunder)
      return callback(null, null)
    callback(null, deletedFunder)
  })
}

exports.findSectionOfFunder = ({query, callback}) => {
    
}