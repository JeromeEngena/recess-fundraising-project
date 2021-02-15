/**
 * post: create funder
 * get: get no. of funders
 * get: get funder stats y -location & proximity
 * delete: remove funder (data)
 * post: migrate funder to user
 * post: verify funder
 * 
 * 
 * ADMIN ROLES
 * get: get all funders
 * 
 */

 require('dotenv').config()
 const { Funder, Project } = require('../models')
 const {generateUniqueId} = require('../utils/uniqid')
 const axios = require('axios') 

 function makeError(error, message) { // handle status codes and check for request.methods always
  return { 
    Message: message,
    Error: error
  }
}

function makeData(data) {
  return {
    status: 200,
    data: data
  }
} 

 module.exports = {
   createFunder: (req, res, next) => {
     // check if funder of similar telephone is not present

    const funder = new Funder({
      first_name: first_name,
      last_name: last_name,
      email: email,
      telephone: telephone,
      projects_funded: [projectFunded]
    })
    funder.save((error, funder) => {
      if (error)
        res.json(makeError(error, 'FAILED TO CREATE FUNDER'))
      res.json(makeData(funder))
    })
   },
   
   appendToFunderProjects: (req, res, next) => {

   },

   getAllFunders: (req, res, next) => {
     Funder.find({}, (error, funders) => {
      if (error)
        res.json(makeError(error, 'FAILED TO GET ALL THE FUNDERS!'))
      res.json(makeData(funders))
     })
   },

   getFunderByID: (req, res, next) => {
    const { id } = req.params
    Funder.findById(id, (error, funder) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND FUNDER WITH ID ${id}`))
      res.json(makeData(funder))
     })
   },

   findFunderByParam: (req, res, next) => {
    Funder.findOne({ telephone: req.params.telephone }, (error, funder) => {
      if (error)
          res.json(makeError(error, `FAILED TO QUERY FUNDER WITH TELEPHONE ${req.params.telephone}.`))
        res.json(makeData(funder))
    })
  },

  deleteFunder: (req, res, next) => {
    const { id } = req.params
    Funder.findByIdAndDelete(id, (error, funder) => {
     if (error)
       res.json(makeError(error, `FAILED TO FIND AND DELETER FUNDER WITH ID ${id}`))
     res.json(makeData(funder))
    })
  },

  saveFunder: (req, res, next) => {
    const { telephone, projectId, donation, currency, payerMessage, payeeNote } = req.body
    Funder.exists({telephone: telephone}, (error, funderExists) => {
      if (error)
        return res.status(500).json({success: false, message: 'Internal server error'})

      if (!funderExists) {
        const funder = new Funder({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email ? req.body.email : null,
          telephone: req.body.telephone,
          fundraisers: [{
            projectId: req.body.projectId,
            visibleProfile: req.body.visibleProfile,
            currency: 'UGX',
            amount: req.body.amount,
            tip: req.body.tip,
            location: [{
              country: req.body.country,
              precise: { 
                type: 'Point',
                coordinates: [
                  req.body.long,
                  req.body.lat
                ]
              }
            }]
          }]
        })
        funder.save((error, funder) => {
          if (error) {
            res.status(500).json({success: false, message: 'Internal server error'})
          }
          res.status(200).json({success: true, message: 'Funder created and donation appended'})
        })
      }

      if (funderExists) {
        Funder.findOneAndUpdate(
          {telephone: req.body.telephone},
          {$push: {fundraisers: {
            projectId: req.body.projectId,
            visibleProfile: req.body.visibleProfile,
            currency: 'UGX',
            amount: req.body.amount,
            tip: req.body.tip,
            location: [{
              country: req.body.country,
              precise: {
                type: 'Point',
                coordinates: [
                  req.body.position.latitude,
                  req.body.position.longitude
                ]
              }
            }]
          }}},
          {returnOriginal: false},
          (error, funder) => {
            if (error) {
              res.status(500).json({success: false, message: 'Internal server error'})
            }
            if (funder) {
              res.status(200).json({success: true, message: 'Donation appended to existing funder'})
            }
          }
        )
      }
    })
  },

  requestToPay: async (req, res, next) => {
    const transactionReceipts = await 
      axios.default( 
      {method: 'post', 
      url: 'https://www.easypay.co.ug/api/',
      data: {
        username: process.env.EASY_PAY_CLIENT_ID,
        password: process.env.EASY_PAY_USER_SECRET,
        action:"mmdeposit",
        amount: req.body.total,
        currency:"UGX",
        phone:req.body.telephone,
        reference: generateUniqueId(),
        reason:`Donation towards fundraiser: ${req.body.projectId}`}
    })
    if (transactionReceipts.success === 1) {
      res.status(200).json({success: true, message: 'Transaction successful'})
    } else if (transactionReceipts.success === 0) {
      res.status(408).json({success: false, message: 'Request Timeout'})
    } else {
      return
    } 
  } 
} 


