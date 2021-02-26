const db = require('../db').Fundraiser

module.exports = {
  createFundraiser: (req, res, next) => {
    const fundraiser = req.body
    db.createFundraiser({fundraiser: fundraiser, callback: (error, fundraiser) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      res.status(201).json({message: 'Fundraiser created'})
    }})
   },

   uploadImagesToServer: (req, res, next) => {
    const images = req.images
    if(!images)
      return res.status(400).json({message: 'Images Not Submitted'})
    res.status(200).send(images)
   },

   getFundraiser: (req, res, next) => {
    db.getFundraiser({query: { ['fundraiser.name']: req.body.name }, callback: (error, fundraiser) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      res.status(200).json(fundraiser)
    }})
   },

   getFundraisersByOwnerId: (req, res, next) => {
    db.getFundraisers({
      query: {ownerId:req.params.ownerId},
      callback: (error, fundraisers) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!fundraisers)
          return res.status(404).json({message: 'Fundraisers Not Found'})
        res.status(200).json(fundraisers)
      }
    })
   },

   getFundraiserById: (req, res, next) => {
    db.getFundraiserById({query: {_id:req.params._id}, callback: (error, fundraiser) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      res.status(200).json(fundraiser) 
    }})
   },

   getAllFundraisers: (req, res, next) => {
    db.getAllFundraisers({callback: (error, fundraisers) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      res.status(200).json(fundraisers)
    }})
  },

  deactivateFundraiser: (req, res, next) => {
    db.updateFundraiser({
      query: {_id: req.params._id}, 
      update: {active: false}, 
      callback: (error, deactivatedFundraiser) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
     if (!deactivatedFundraiser)
        return res.status(404).json({message: 'Fundraiser Not Found'})
     res.status(200).json({message: 'Fundraiser Deactivated'})
    }})
  },

  deleteFundraiser: (req, res, next) => {
    db.deleteAFundraiser({query: {_id: req.params._id}, callback: (error, deletedFundraiser) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!deletedFundraiser)
        return res.status(404).json({message: 'Fundraiser Not Found', error: error.message})
      res.status(200).json({message: 'Fundraiser Deleted'})
    }})
   },

   verifyFundraiser: (req, res, next) => {
    db.updateFundraiser({query: {_id: req.params._id}, update: {verified: true}, callback: (error, verifiedFundraiser) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!verifiedFundraiser)
        return res.status(404).json({message: 'Fundraiser Not Found'})
      res.status(200).json({message: 'Fundraiser Verified'})
    }})
   },

   addFunderToFundraiser: (req, res, next) => {
    db.updateFundraiser({
      query: {_id: req.params._id},
      update: {
        $push: {['stats.funders']: req.body.funder}, 
        $inc: {['stats.current']: req.body.funder.donation}
      },
      callback: (error, updatedFundraiser) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!updatedFundraiser)
          return res.status(404).json({message: 'Fundraiser Not Found'})
        res.status(201).json({message: 'Funder Added To Fundraiser'})
      }
    })
  },

  addThanksToFundraiser: (req, res, next) => {
    db.updateFundraiser({
      query: {_id: req.param._id},
      update: {$push: {['stats.thanks']: req.body.thanks}},
      callback: (error, updatedFundraiser) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!updatedFundraiser)
          return res.status(404).json({message: 'Fundraiser Not Found'})
        res.status(201).json({message: 'Thanks Added To Fundraiser'})
      }
    })
  }
}