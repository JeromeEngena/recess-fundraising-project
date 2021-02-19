require('dotenv').config()
const db = require('../db').User
const bcrypt = require('../utils/bcrypt')
const jwt = require('../utils/jwt')

module.exports = {
  registerUser: (req, res, next) => {
    db.findIfUserExists({query: {email: req.body.email}, callback: (error, exists) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (exists)
        return res.status(409).json({message: 'Email Already Exists'})
      db.findIfUserExists({
        query: {telephone: req.body.contact.telephone}, 
        callback: (error, exists) => {
          if (error)
            return res.status(500).json({message: 'Internal Server Error', error: error.message})
          if (exists)
            return res.status(409).json({message: 'Telephone Already Exists'})
          bcrypt.encryptData({
            data: req.body.password,
            callback: (error, hashedPassword) => {
              if (error)
                return res.status(500).json({message: 'Internal Server Error', error: error.message})
              if (!hashedPassword)
                return res.status(500).json({message: 'Password Not Hashed'})
              db.createUser({
                user: {...req.body, password: hashedPassword},
                callback: (error, registeredUser) => {
                  if (error)
                    return res.status(500).json({message: 'Internal Server Error', error: error.message})
                  if (registeredUser)
                    res.status(201).json({message: 'User Registered'})
                }
              })
            }
          })
        }
      })
    }})
  },

  loginUser: (req, res, next) => {
    db.findIfUserExists({query: {email: req.body.email}, callback: (error, emailExists) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!emailExists)
        return res.status(404).json({message: 'User With Email Not Found'})
      db.getUser({query: {email: req.body.email}, callback: (error, user) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        bcrypt.compareWithEncryptedData({
          unencryptedData: req.body.password,
          encryptedData: user.password,
          callback: (error, passwordsMatch) => {
            if (error)
              return res.status(500).json({message: 'Internal Server Error', error: error.message})
            if (!passwordsMatch)
              return res.status(403).json({message: 'Invalid Password Provided'})
            let serializedUserId = {_id: user._id}
            const accessToken = jwt.generateAccessToken(serializedUserId)
            const refreshToken = jwt.generateRefreshToken(serializedUserId)
            res.status(200).json({
              auth: true,
              accessToken: accessToken,
              refreshToken: refreshToken 
            })
          }
        })
      }})
    }})
  },

  getAllUsers: (req, res, next) => {
    db.getAllUsers({callback: (error, users) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (users)
        res.status(200).json(users)
    }})
  },

  getUserById: (req, res, next) => {
    db.getUserById({query: {_id: req.params._id}, callback: (error, user) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!user)
        return res.status(404).json({message: 'User Not Found'})
      res.status(200).json(user)
    }})
  },

  getUser: (req, res, next) => {
    db.getUser({query: {email: req.params.email}, callback: (error, user) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!user)
        return res.status(404).json({message: 'User Not Found'})
      res.status(200).json(user)
    }})
  },

  verifyUser: (req, res, next) => {
    db.updateUser({ 
      query: {_id: req.params._id},
      update: {verified: true},
      callback: (error, updatedUser) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!updatedUser)
          return res.status(404).json({message: 'User Not Found'})
        res.status(200).json({message: 'User Verified'})
      }
    })
  },

  deactivateUser: (req, res, next) => {
    db.updateUser({
      query: {_id: req.params._id},
      update: {active: false, _dateClosed: new Date().toLocaleString()},
      callback: (error, updatedUser) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!updatedUser)
          return res.status(404).json({message: 'User Not Found'})
        res.status(200).json({message: 'User Deactivated'})
      }
    })
  },

  deleteUser: (req, res, next) => {
    db.deleteUser({query: {_id: req.params._id}, callback: (error, deletedUser) => {
      if (error)
        return res.status(500).json({message: 'Internal Server Error', error: error.message})
      if (!deletedUser)
        return res.status(404).json({message: 'User Not Found'})
      res.status(200).json({message: 'User Deleted'})
    }})
  },

  resetPassword: (req, res, next) => {
    bcrypt.encryptData({
      data: req.body.newPassword, 
      saltRounds: 10,
      callback: (error, hashedPassword) => {
        if (error)
          return res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!hashedPassword)
          return res.status(500).json({message: 'Password Not Hashed'})
        db.updateUser({
          query: {_id: req.params._id},
          update: {password: hashedPassword},
          callback: (error, updatedUser) => {
            if (error)
              return res.status(500).json({message: 'Internal Server Error', error: error.message})
            if (!updatedUser)
              return res.status(404).json({message: 'User Not Found'})
            res.status(200).json({message: 'User Password Reset'})
          }
        })
    }})
  },

  addFundraiserToUser: (req, res, next) => {
    db.updateUser({
      query: {_id: req.params._id},
      update: {
        $push: {fundraisers: req.body.fundraiserId}
      },
      callback: (error, updatedUser) => {
        if (error)
          res.status(500).json({message: 'Internal Server Error', error: error.message})
        if (!updatedUser)
          res.status(404).json({message: 'User Not Found'})
        res.status(201).json({message: 'Fundraiser Added To User'})
      }
    })
  },

  disburseDonations: (req, res, next) => {
    
  }
}