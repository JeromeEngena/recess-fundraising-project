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
const { User, Project } = require('../models')

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
  registerUser: (req, res, next) => {
    const {first_name, last_name, email, telephone, password } = req.body
    User.exists({ $or: [{ email: email }, { 'contact.telephone': telephone }] }, (error, userExists) => {
      if (error) {
        res.json(makeError(error, `FAILED TO QUERY USER WITH EMAIL ${email} OR TELEPHONE ${telephone}.`))
      }
      
      if (userExists) {
        res.json(makeError(`USER WITH EMAIL ${email} OR WITH TELEPHONE ${telephone} ALREADY EXISTS`))
      } else {
        hashPassword(password, (error, hashedPassword) => {
          if (error)
            res.json(makeError(error, 'HASHING OF USER PASSWORD FAILED!'))
          const user = new User({
            first_name: first_name,
            last_name: last_name,
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
      }
    })
  },

  loginUser: (req, res, next) => {
    // generate session token and send it to client
    const { email, password } = req.body
    User.findOne({ email: email }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND USER WITH EMAIL ${email}.`))
        comparePasswords(password, user.password, (error, result) => {
        if (error)
          res.json(makeError(error, `PASSWORD COMPARISON FAILED!`))
        res.json(makeData(user))
      })
    })
  },

  // updateUser: (req, res, next) =>  {

  //   User.findById(req.params.id, (error, user) => {
  //     if (error) 
  //       res.json(makeError(error, `FAILED TO FIND USER WITH ID ${req.params.id}`))

  //     if (user) {
  //       // const { password, email, telephone, verified, active } = req.body
  //       const updatedFields = {}
  //       Object.entries(req.body).forEach((key,value) => {
  //         if (key === 'telephone' || key === 'verified') {
  //           User.updateOne(user.id, { [`contact.${key}`]: value })
  //         } else {
  //           User.updateOne(user.id, {  })
  //         }
  //       })
  //   })
  // },

  getAllUsers: (req, res, next) => {
    User.find({}, (error, users) => {
      if (error)
        res.json(makeError(error, 'FAILED TO GET ALL THE USERS!'))
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

  verifyUser: (req, res, next) => { // add this to schema, so user is automatically verified on NIN being presented
    const { id } = req.params
    User.findByIdAndUpdate(id, { verified: true }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO VERIFY USER WITH ID: ${id}`))
      res.json(makeData(user.verified))
    })
  }, 

  forgotPassword: (req, res, next) => {

  },

  resetPassword: (req, res, next) => {

  },

  setUserLocation: (req, res, next) => {
    const { id, lat, long } = req.params
    User.findByIdAndUpdate(id, { ['location.precise.coordinates']: [ lat, long ] }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO UPDATE PRECISE LOCATION OF USER WITH ID: ${id}`))
      res.json(makeData(user.location))
    })
  },

  getUserProjects: (req, res, next) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND USER WITH ID: ${id}`))

        Project.find({ _id: { $in: user.projects } }, (error, projects) => {
          if (error) 
            res.json(makeError(error, `FAILED TO GET PROJECTS OF USER WITH ID ${id}`))
          res.json(makeData(projects))
        })
    })
  },

  addToUserProjects: (req, res, next) => {

  },


 }