const {Fundraiser} = require('../models')

exports.createFundraiser = ({fundraiser, callback}) => {
  const newFundraiser = new Fundraiser(fundraiser)
  newFundraiser.save((error, createdFundraiser) => {
    if (error)
      return callback(error, null)
    if (!createdFundraiser)
      return callback(null, null)
    callback(null, createdFundraiser)
  })
}

exports.getFundraiser = ({query, callback}) => {
  Fundraiser.findOne(query, (error, fundraiser) => {
    if (error)
      return callback(error, null)
    if (!fundraiser)
      return callback(null, null)
    callback(null, fundraiser)
  })
}

exports.getFundraiserById = ({query, callback}) => {
  Fundraiser.findById(query, (error, fundraiser) => {
    if (error)
      return callback(error, null)
    if (!fundraiser)
      return callback(null, null)
    callback(null, fundraiser)
  })
}

exports.getFundraisers = ({query, callback}) => {
  Fundraiser.find(query, (error, fundraisers) => {
    if (error)
      return callback(error, null)
    if (!fundraisers)
      return callback(null, null)
    callback(null, fundraisers)
  })
}

exports.findIfFundraiserExists = ({query, callback}) => {
  Fundraiser.exists(query, (error, result) => {
    if (error)
      return callback(error, null)
    callback(null, result)
  })
}

exports.getAllFundraisers = ({callback}) => {
  Fundraiser.find({}, (error, fundraisers) => {
    if (error)
      return callback(error, null)
    if (!fundraisers)
      return callback(null, null)
    callback(null, fundraisers)
  })
}

exports.updateFundraiser = ({query, update, callback}) => {
  Fundraiser.findByIdAndUpdate(query, update, {new: true}, (error, updatedFundraiser) => {
    if (error)
      return callback(error, null)
    if (!updatedFundraiser)
      return callback(null, null)
    callback(null, updatedFundraiser)
  })
}

exports.deleteAFundraiser = ({query, callback}) => {
  Fundraiser.findByIdAndDelete(query, (error, deletedFundraiser) => {
    if (error)
      return callback(error, null)
    if (!deletedFundraiser)
      return callback(null, null)
    callback(null, deletedFundraiser)
  })
}

exports.findSectionOfFundraiser = ({query, callback}) => {
}
