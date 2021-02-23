const db = require('../db').EmailSubscriber
const bcrypt = require('../utils/bcrypt')

module.exports = {
  createEmailSubscriber: (req, res, next) => {
    db.findIfEmailSubscriberExists({query: {email: req.body.email}, callback: (error, exists) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error'})
      if (exists)
        return res.status(404).json({message: 'Email already exists'})
      bcrypt.encryptData({
        data: req.body.email,
        callback: (error, hashedEmail) =>  {
          if (error)
            return res.status(500).json({message: 'Internal Server Error'})
          if (!hashedEmail)
            return res.status(500).json({message: 'Email Not Hashed'})
          db.createEmailSubscriber({
            emailSubscriber: {...req.body, email: hashedEmail},
            callback: (error, registeredEmailSubscriber) => {
              if (error) 
                return res.status(500).json({message: 'Internal Server Error'})
              if (!registeredEmailSubscriber)
                return res.status(500).json({message: 'Failed to Register Email Subscriber'})
              if (registeredEmailSubscriber)
                res.status(201).json({message: 'Email Subscriber Registered'})
            }
          })
        }
      })
    }})
  },

  getAllEmailSubscribers: (req, res, next) => {
    db.getAllEmailSubscribers({callback: (error, emailSubscribers) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error'})
      if (!emailSubscribers)
        return res.status(500).json({message: 'Email Subscribers Not Found'})
      res.status(200).json(emailSubscribers)
    }})
  },

  getEmailSubscribers: (req, res, next) => {
    if (req.body.nameList) {
      db.getEmailSubscribers({
        query: {email: {"$in": req.body.nameList}},
        callback: (error, emailSubscribers) => {
          if (error)
            return res.status(500).json({message: 'Internal Server Error'})
          if (!emailSubscribers)
            return res.status(404).json({message: 'Email Subscribers Not Found'})
          if(emailSubscribers)
            res.status(200).json(emailSubscribers)
        }
      })
    } else if (req.body.emailList) {
      db.getEmailSubscribers({
        query: {email: {"$in": req.body.emailList}},
        callback: (error, emailSubscribers) => {  
          if (error)
            return res.status(500).json({message: 'Internal Server Error'})
          if (!emailSubscribers)
            return res.status(404).json({message: 'Email Subscribers Not Found'})
          if(emailSubscribers)
            res.status(200).json(emailSubscribers)
        }
      })
    } else {
      res.status(400).json({message: 'Bad Request'})
    }
  },

  getEmailSubscriberById: (req, res, next) => {
    db.getEmailSubscriberById({query: {_id:req.params._id}, callback: (error, emailSubscriber) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error'})
      if (!emailSubscriber)
        return res.status(404).json({message: 'Email Subscriber Not Found'})
      if(emailSubscriber)
        res.status(200).json(emailSubscriber)
    }})
  },

  getEmailSubscriberByEmail: (req, res, next) => {
    if (!req.params.email)
      return res.status(400).json({message: 'Bad Request'})
    db.getEmailSubscriber({query: {email:req.params.email}, callback: (error, emailSubscriber) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error'})
      if (!emailSubscriber)
        return res.status(404).json({message: 'Email Subscriber Not Found'})
      if(emailSubscriber)
        res.status(200).json(emailSubscriber)
    }})
  },

  getEmailSubscriberByName: (req, res, next) => {
    if (!req.params.name)
      return res.status(400).json({message: 'Bad Request'})
    db.getEmailSubscriber({query: {email:req.params.name}, callback: (error, emailSubscriber) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error'})
      if (!emailSubscriber)
        return res.status(404).json({message: 'Email Subscriber Not Found'})
      if(emailSubscriber)
        res.status(200).json(emailSubscriber)
    }})
  },

  getSortedEmailSubscribersByCoordinates: (req, res, next) => {

  },

  sendEmailToEmailSubscribers: (req, res, next) => {

  },
  deleteEmailSubscriber: (req, res, next) => {

  }
}