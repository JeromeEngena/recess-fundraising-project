/**
 * post: register user
 * get: login user 
 * post: verify user 
 * delete: remove user 
 * post: update user info
 * 
 * 
 * ADMIN ROLES
 * get: get all users
 * get: get a user by -name -id -stats
 * delete: remove all users 
 * post: verify user
 */

const bcrypt = require('bcrypt')
const { User } = require('../models')

async function hashPassword(password, callback) {
  const SALT_ROUNDS = 10
  await bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    if (error)
      callback(error, null)
    callback(null, hash)
  })
}

async function comparePasswords(plaintextPassword, hashedPassword, callback) {
  await bcrypt.compare(plaintextPassword, hashedPassword, (error, result) => {
    if (error)
      callback(error, null)
    callback(null, result)
  })
}

function makeError(error, message) { // handle status codes
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
  registerUser: (req, res, next) => {
    // ensure no user exist with similar email and telephone number
    const {name, email, telephone, password } = req.body
    hashPassword(password, (error, hashedPassword) => {
        if (error)
          res.json(makeError(error, 'HASHING OF PASSWORD FAILED!'))
        const user = new User({
          name: name,
          email: email,
          contact: {telephone: telephone },
          password: hashedPassword
        })
        user.save((error, user) => {
          if (error)
            res.json(makeError(error, 'FAILED TO REGISTER USER!'))
          res.json(makeData(user))
        })
    }) 
  },

  loginUser: (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND USER WITH EMAIL ${email}`))
      comparePasswords(password, user.password, (error, result) => {
        if (error)
          res.json(makeError(error), `PASSWORD COMPARISON FAILED!`)
        res.json(makeData(user))
      })
    })
  },

  updateUser: (req, res, next) =>  {
    const { id, password, NIN,  } = req.params

  },

  getAllUsers: (req, res, next) => {
    User.find({}, (error, users) => {
      if (error)
        res.json(makeError(error, 'FAILED TO GET THE USERS'))
      res.json(makeData(users))
    })
  },

  getSingleUser: (req, res, next) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND USER WITH ID: ${id}`))
      res.json(makeData(user))
    })
  },

  deactivateUser: (req, res, next) => {
    const { id } = req.params
    // change _dateClosed: Date.now()
    User.findByIdAndUpdate(id, { active: false }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO DEACTIVATE USER WITH ID ${id}`))
      res.json(makeData(user))
    })
  },

  deleteUser: (req, res, next) => {
    const { id } = req.params
    User.findOneAndDelete({ _id: id }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND AND DELETER USER WITH ID ${id}`))
      res.json(makeData(user))
    })        
  },

  verifyUser: (req, res, next) => {
    const { id } = req.params
    // change NIN : req.params.NIN and contact.verified: true
    User.findByIdAndUpdate(id, { verified: true }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO VERIFY USER WITH ID: ${id}`))
      res.json(makeData(user.verified))
    })
  }, 

  setUserLocation: (req, res, next) => {
    const { id, lat, long } = req.params
    User.findByIdAndUpdate(id, { coordinates: [ lat, long ] }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO UPDATE PRECISE LOCATION OF USER WITH ID: ${id}`))
      res.json(makeData(user.location))
    })
  },

  getUserProjects: (req, res, next) => {
    const { id } = req.params
    // use an aggregator to return only user projects
    User.findById(id, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND USER WITH ID: ${id}`))
      res.json(makeData(user.project))
    })
  }
 }