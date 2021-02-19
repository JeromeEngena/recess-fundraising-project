require('dotenv').config()
const db = require('../db').Funder
const easyPay = require('../services/EasyPay')

module.exports = { // failed manual postman test - when funder donates twice or more
  createFunder: (req, res, next) => {
    db.checkIfFunderExists({query: {telephone: req.body.funder.telephone}, callback: (error, funderExists) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (funderExists) {
        db.updateFunder({
          query: {telephone: req.body.telephone}, 
          update: {$push: {fundraisers: req.body.fundraiserId}},
          callback: (error, updatedFunder) => {
            if (error)
              return res.status(500).json({message: 'Internal Server Error', error: error.message})
            if (updatedFunder)
              return res.status(201).json({message: 'Fundraiser Added To Funder', funder: updatedFunder})
          }
        })
      }
      if (!funderExists) {
        const funder = req.body.funder
        funder.fundraisers = [req.body.fundraiserId]
        db.createFunder({funder: funder, callback: (error, newFunder) => {
          if (error)
            return res.status(500).json({message: 'Internal Server Error', error: error.message})
          if (newFunder)
            res.status(201).json({message: 'Funder Created', newFunder: newFunder})
        }})
      }
    }})
  },

  getFunder: (req, res, next) => {
    db.getFunder({query: {telephone: req.params.tel}, callback: (error, funder) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!funder)
        return res.status(404).json({message: 'Funder Not Found'})
      res.status(200).json(funder)
    }})
  },

  getFunderById: (req, res, next) => {
    db.getFunderById({query: {_id: req.params._id}, callback: (error, funder) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!funder)
        return res.status(404).json({message: 'Funder Not Found'})
      res.status(200).json(funder)
    }})
  },

  getAllFunders: (req, res, next) => {
    db.getAllFunders({callback: (error, funders) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      res.status(200).json(funders)
    }})
  },

  deleteFunder: (req, res, next) => {
    db.deleteFunder({query: {_id: req.body._id}, callback: (error, deletedFunder) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!deletedFunder)
        return res.status(404).json({message: 'Funder Not Found'})
      res.status(200).json({message: 'Funder Deleted'})
    }})
  },
  
  processFunderDonation: (req, res, next) => {
    easyPay.requestFunderToPay({
      telephone: req.body.telephone, 
      totalToPay: req.body.totalToPay, 
      projectName: req.body.projectName, 
      callback: (error, transactionReceipts) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!transactionReceipts.success) 
          return res.status(408).json({
            message: 'Request Timeout', 
            error: transactionReceipts.Error, 
            errorMessage: transactionReceipts.errormsg
          })
        res.status(200).json({message: 'Transaction Successful', receipts: transactionReceipts.data})
      }
    })
  }
}


